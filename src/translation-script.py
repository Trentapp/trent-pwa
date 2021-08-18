import re
import json
# from copy import deepcopy

prefix = "./components/"
#files without account settings because it was already done manually
#do datenschutz and impressum separately
files = ["add-product", "add-review", "ask-question", "booking-request", "BookingCard", "chat", "ChatsList", "dashboard", "footer", "ForgotPassword", "login", "NotFound", "product", "ProductCard", "products-list", "Profile", "profileCard", "Review", "signup", "TransactionCard", "TransactionList"]
suffix = ".js"

obj = {}
for filename in files:
    with open(prefix+filename+suffix, "r") as file:
        f = file.read()
        obj[filename] = {}
        linkpatt = r'="(/[\w\.]*)*"'
        f = re.sub(linkpatt, "", f)
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
            obj[filename][text] = text

for filename, dic in [("add-product", obj["add-product"])]: #obj.items():
    with open(prefix+filename+suffix, "r+") as file:
        f = file.read()
        for key, phrase in dic.items():
            f = re.sub(key, '{t("'+key+'")}', f)

print(json.dumps(obj, indent=4))
#with open("../public/locales/en/translation2.json", "w") as file:
#    file.write(json.dumps(obj, indent=4))
        



