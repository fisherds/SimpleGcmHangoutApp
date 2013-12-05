""" Movie quotes API"""


import endpoints
from protorpc import remote

from models import GcmRobotCommand

@endpoints.api(name='mercury', version='v1', description='Mercury Robot API', hostname='fisherds-hangout-gcm.appspot.com')
class MercuryApi(remote.Service):
    """ Class which defines mercury API"""
    
    @GcmRobotCommand.method(path='command/insert', http_method='POST', name='command.insert')
    def command_insert(self, a_command):
        """ Sends a GCM message to the robot. """
        a_command.put()
        return a_command
    
    @GcmRobotCommand.query_method(query_fields=('limit', 'order', 'pageToken'), path='command/list', http_method='GET', name='command.list')
    def command_list(self, query):
        """ Return a list of commands. """
        return query
    

app = endpoints.api_server([MercuryApi], restricted=False)    

    