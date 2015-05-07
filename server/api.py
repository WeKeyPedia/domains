import codecs
import json

from flask import Blueprint
from flask import jsonify

api = Blueprint('api', __name__, template_folder='templates')

notebooks_dir = "../../notebooks"

@api.route("/api/domain/<domain>/list")
def domain_list(domain):
  result = {
    "pages": []
  }

  with codecs.open("{0}/{1}/data/pagenames.txt".format(notebooks_dir, domain),"r", "utf-8-sig") as f:
    result["pages"].extend([ page.strip() for page in f.readlines() ])

  return jsonify(result)

@api.route("/api/page/<lang>/<page>")
def page(lang, page):
  result = {}
  domain = "geometry"

  with codecs.open("%s/%s/data/pages/%s.json" % (notebooks_dir, domain, page), "r", "utf-8-sig") as f:
    j = json.load(f)
    content = j["query"]["pages"][j["query"]["pages"].keys()[0]]

    result["title"] = content["title"]

    content = content["revisions"][0]["*"]

    result["content"] = content

  return jsonify(result)
