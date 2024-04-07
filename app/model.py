import pymongo
import os

from threading import Thread
from transformers import AutoTokenizer, AutoModelForCausalLM, TextIteratorStreamer

from langchain.vectorstores.mongodb_atlas import MongoDBAtlasVectorSearch
from langchain.embeddings import HuggingFaceEmbeddings

from dotenv import load_dotenv

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
device = "mps"  # NOTE: Apple: mps, Nvidia RTX: cuda, Others: cpu

def get_mongo_client(mongo_uri):
    try:
        client = pymongo.MongoClient(mongo_uri)
        print("Connection to MongoDB successful")
        return client
    except Exception as e:
        print(f"Connection failed: {e}")
        return None


model_name = "sentence-transformers/gtr-t5-xl"
encode_kwargs = {'normalize_embeddings': True}

embedding_function = HuggingFaceEmbeddings(
    model_name=model_name,
    model_kwargs={'device': device},
    encode_kwargs=encode_kwargs,
)

tokenizer = AutoTokenizer.from_pretrained("google/gemma-2b-it")
model = AutoModelForCausalLM.from_pretrained(
    "google/gemma-2b-it",
    device_map=device,
)

def prompt(query, target):
    vector_search = MongoDBAtlasVectorSearch.from_connection_string(
        mongo_uri,
        target,
        embedding_function,
        index_name="vector_index"
    )

    retriever = vector_search.as_retriever(
        search_type="similarity",
        search_kwargs={
            "k": 3,
            "score_threshold": 0.95,
        }
    )

    source_information = ""
    documents = retriever.get_relevant_documents(query)
    for doc in documents:
        source_information += doc.page_content

    chat = [
        {
            "role": "user",
            "content": f"You are a helpful AI assistant that tries your best to provide helpful and through responses. You can use the provided context to answer the questions. The question is: \"{query}\". The context related to this question is as follows: {source_information}. Extract the core details and provide a informative answer. Exclude any unnecessary information."
        }
    ]

    prompt = tokenizer.apply_chat_template(chat, tokenize=False, add_generation_prompt=True) 
    inputs = tokenizer.encode(prompt, add_special_tokens=False, return_tensors="pt").to(device) 
    text_streamer = TextIteratorStreamer(tokenizer, skip_prompt=True, skip_special_tokens=True) 

    thread = Thread(target=model.generate, kwargs=dict(input_ids=inputs, streamer=text_streamer, max_new_tokens=500)) 
    thread.start() 
    for new_text in text_streamer: 
        yield new_text
