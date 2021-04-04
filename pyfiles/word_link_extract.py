from docx import Document
import sys

def para2text(p):
    rs = p._element.xpath('.//w:t')
    return u" ".join([r.text for r in rs])

nm = sys.argv[1];
doc = Document(nm)
fullText=""

for para in doc.paragraphs:
    fullText += " "+para2text(para)

print(fullText)
