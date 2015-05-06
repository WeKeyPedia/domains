import codecs

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
