import re
import json
from googletrans import Translator
# from copy import deepcopy

prefix = "./components/"
#files without account settings because it was already done manually
#do datenschutz and impressum separately
files = ["add-product", "add-review", "ask-question", "booking-request", "BookingCard", "chat", "ChatsList", "dashboard", "footer", "ForgotPassword", "login", "NotFound", "ProductCard", "products-list", "Profile", "profileCard", "Review", "signup", "TransactionCard", "TransactionList"]
suffix = ".js"
trans = Translator()
# lng = "de"
# obj = {}
# for filename in files:
#     with open(prefix+filename+suffix, "r") as file:
#         f = file.read()
#         obj[filename] = {}
#         pattern = r'{t\("[\w\s,;:?!&\./(=)%€$-]+"\)}'
#         texts = re.findall(pattern, f)
#         for text in texts:
#             text = text[4:-3]
#             if text != "":
#                 print(text)
#                 obj[filename][text] = trans.translate(text, src="en", dest=lng).text
                
# print(json.dumps(obj, indent=4))
# with open("../public/locales/de/translation.json", "w") as file:
#    file.write(json.dumps(obj, indent=4))
#translating english to json-english
"""
obj = {}
for filename in files:
    with open(prefix+filename+suffix, "r") as file:
        f = file.read()
        obj[filename] = {}
        linkpatt = r'="(/[\w\.]*)*"'
        f = re.sub(linkpatt, "", f)
        parampatt = r'={[\w\.?+-;:=>()!/*]*}'
        objpatt = r'[(]*{[\w\.?]*}[)]*'
        f = re.sub(parampatt, "", f)
        f = re.sub(objpatt, "</><>", f)#deleting objects so they are not shown
        pattern = r'<[\w\s{}%"\.=]*>[\w\s{}()!?:;%/€,\."]+</[\w]*>'
        tagpatt = r'<[/]*[\w\s{}%"\.=]*>'
        # did not work :
        # pattern = r'<[\w\s{}%"\.=]*("[/\w\.${}]*")*[\w\s{}%"\.=]*>[\w\s{}()!?:;%/€,\."]+</[\w]*>'
        # tagpatt = r'<[/]*[\w\s{}%"\.=]*("[/\w\.${}]*")*[\w\s{}%"\.=]*>'
        texts = re.findall(pattern, f)
        for text in texts:
            text = re.sub(tagpatt, "", text)
            text = re.sub("  ", "", text)
            text = re.sub("\n", "", text)
            if text != "":
                obj[filename][text] = text.replace("{", "{{").replace("}", "}}")

#problem: the strings may not be unique and may be substrings of other parts of the page that should not be changed (e.g. Send also makes replace onSendMessage)
for filename, dic in obj.items(): #[("Profile", obj["Profile"])]: 
    f = ""
    with open(prefix+filename+suffix, "r+") as file:
        f = file.read()
        for key, phrase in dic.items():
            attach = ""
            # from other option where you populated objects in translation:
            # objpatt = r'{[\w\.]*}'
            # objects = re.findall(objpatt, key)
            # for o in objects:
            #     attach += '"' + o[1:-1] + '"' + ": " + o[1:-1] + ", "
            # if attach != "":
            #     attach = ", {" + attach[:-2] + "}"
            f = re.sub(key, '{t("'+key+'"'+attach+')}', f)
    # print(f)
    # with open(prefix+filename+suffix, "w") as file:
    #     file.write(f)

# writing JSON to en/translation file
# with open("../public/locales/en/translation2.json", "w") as file:
#    file.write(json.dumps(obj, indent=4))
"""
#translating to german (maybe I should have just written a JSON translator)
#for JSON translator: simply use pattern r': "[\w{}()\s,;.=:-?!%\/€$]+"'
# trans = Translator()
# lng = "de"
# obj = {}
# for filename in files:
#     with open(prefix+filename+suffix, "r") as file:
#         f = file.read()
#         obj[filename] = {}
#         pattern = r'{t\("[\w\s,;:?!&\./(=)%€$-]+"\)}'
#         texts = re.findall(pattern, f)
#         for text in texts:
#             text = text[4:-3]
#             if text != "":
#                 print(text)
#                 obj[filename][text] = trans.translate(text, src="en", dest=lng).text
                
# print(json.dumps(obj, indent=4))
# with open("../public/locales/de/translation.json", "w") as file:
#    file.write(json.dumps(obj, indent=4))


#########################################
# helper script to add the "file." extensions that I forgot earlier
files.append("product")
for filename in files:
    f = ""
    with open(prefix+filename+suffix, "r") as file:
        f = file.read()
        pattern = r'{t\("[\w\s,;:?!&\./(=)%€$-]+"\)}'
        texts = re.findall(pattern, f)
        for text in texts:
            f = f.replace(text, text[:4] + filename + "." + text[4:])



