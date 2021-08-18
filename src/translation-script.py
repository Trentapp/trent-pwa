import re
import json

prefix = "./components/"
#files without account settings because it was already done manually
#do datenschutz and impressum separately
files = ["add-product", "add-review", "ask-question", "booking-request", "BookingCard", "chat", "ChatsList", "dashboard", "footer", "ForgotPassword", "Header", "login", "NotFound", "product", "ProductCard", "products-list", "Profile", "profileCard", "Review", "signup", "TransactionCard", "TransactionList"]
suffix = ".js"

obj = {}

for filename in files:
    with open(prefix+filename+suffix, "r") as file:
        f = file.read()
        obj[filename] = {}
        pattern = r"<[\w]*>[\w\s{}]+</[\w]*>"
        tagpatt = r"<[/]*[\w]*>"
        texts = re.findall(pattern, f)
        for text in texts:
            text = re.sub(tagpatt, "", text)
            obj[filename][text] = text

open("../public/locales/en/translation2.json")
json.dumps(obj, indent=4)
        



