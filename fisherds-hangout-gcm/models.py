# Put our model objects here
# Model objects get stored and due to proto datastore
#   they messages as well (for free)

from google.appengine.ext import ndb
from endpoints_proto_datastore.ndb import EndpointsModel

class GcmRobotCommand(EndpointsModel):
    """ Model object (and message) for a robot command. """
    name = ndb.StringProperty()
    script_number = ndb.IntegerProperty()
    last_touch_date_time = ndb.DateTimeProperty(auto_now=True)
    gcm_response = ndb.StringProperty()
    