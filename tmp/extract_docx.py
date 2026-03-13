import zipfile
import xml.etree.ElementTree as ET
import os

def docx_to_text(docx_path):
    try:
        with zipfile.ZipFile(docx_path, 'r') as zip_ref:
            xml_content = zip_ref.read('word/document.xml')
            tree = ET.fromstring(xml_content)
            
            # Namespace for Word XML
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            
            # Extract all text elements
            texts = tree.findall('.//w:t', ns)
            return "".join([t.text for t in texts if t.text])
    except Exception as e:
        return f"Error: {str(e)}"

docx_path = r"d:\nietzsche-chronicle\SIÊU_CẨM_NANG_TẠO_VIDEO_AI.docx"
text = docx_to_text(docx_path)

with open(r"d:\nietzsche-chronicle\tmp\manual_text.txt", "w", encoding="utf-8") as f:
    f.write(text)

print("Done")
