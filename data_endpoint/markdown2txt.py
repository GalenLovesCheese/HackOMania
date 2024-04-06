import os
import markdown2

def convert_md_to_txt(input_file):
    # Read Markdown file and convert to HTML
    with open(input_file, 'r', encoding='utf-8') as f:
        markdown_content = f.read()
    html_content = markdown2.markdown(markdown_content)

    # Convert HTML to plain text
    text_content = markdown2.html2text(html_content)

    return text_content

def convert_repository_to_txt(repo_path, output_file):
    with open(output_file, 'w', encoding='utf-8') as out_file:
        for root, dirs, files in os.walk(repo_path):
            for file in files:
                if file.endswith('.md'):
                    input_file = os.path.join(root, file)
                    text_content = convert_md_to_txt(input_file)
                    out_file.write(text_content)
                    out_file.write('\n\n')  # Add newline between files

if __name__ == "__main__":
    # Specify the path to the repository folder and the output text file
    repo_path = 'C:\Users\user\OneDrive - Ngee Ann Polytechnic\HackOMania\data_endpoint\md_files\moe-chuachukangsec-staging'
    output_file = 'output.txt'

    # Convert repository Markdown files to text
    convert_repository_to_txt(repo_path, output_file)
