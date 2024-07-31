FRIEND REQUEST TESTING LOG 1: 
--------------------------
**logging user 1**
username: testuser
password: pear
output: 
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzIyMzg5ODcyfQ.T4U3VUaxwnavw6Lym0deYFSfDpJlzjTh7s3Cio7d5Wg"
}

**logging user 2**
username: testing
password: apple 
output:
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpbmciLCJpYXQiOjE3MjIzODk5MTh9.C2nvbScmQ5175IN9U__siELgD6SNxUA65IJFW6nhQ_k"
}

**sending friend request from testing to testuser** 
output: 
{
	"message": "friend request sent",
	"success": true
}

**checking for friend requests from testuser** 
output: 
{
	"message": "'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzIyMzg5ODcyfQ.T4U3VUaxwnavw6Lym0deYFSfDpJlzjTh7s3Cio7d5Wg' not a valid key=value pair (missing equal-sign) in Authorization header: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzIyMzg5ODcyfQ.T4U3VUaxwnavw6Lym0deYFSfDpJlzjTh7s3Cio7d5Wg'."
}

**first test for friend functionality unsuccessful** 
conclusion: there is issue with bearer token when trying to find friend request 

FRIEND REQUEST TESTING LOG 2: 
-----------------------------
**logging user 1** 
username: testuser 
password: pear 
output: 
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzIyNDAwOTU4fQ.YelRZuLuQx5Ra6Ml9_kiLRKMHRbldlsHtWCKGpKYcWQ"
}

**logging user 2**
username: testing
password: apple 
output: 
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpbmciLCJpYXQiOjE3MjI0MDA5OTh9.FewKG3fqmtZpnNuqHqDntMF3OtQJwN5XZqNWAChUmuM"
}

**sending friend request from testing to testuser** 
output: 
{
	"message": "friend request sent",
	"success": true
}

**checking for friend request from testuser**
output:
{
	"message": "search for friend request successful",
	"friendRequests": {}
}

**second test for friend request functionality unsuccessful**
conclusion: the first issue is fixed, but now the request is returning no friend request, 
when it should 

FRIEND REQUEST TESTING LOG 3: 
----------------------------
**logging user 1** 
username: testuser
password: pear
output:
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWF0IjoxNzIyNDQ5MDI0fQ.CPIwdrF5E4UrX8DwZ8zkDrVxfMqtI1GtURvtI_src1w"
}

**logging user 2**
username: testing
password: apple 
output: 
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpbmciLCJpYXQiOjE3MjI0NDkwNDB9.s070AmfFkMLGcUCcJgAwogaIRkbR_qMqmKUlJfyq99c"
}

**sending friend request from testing to testuser**
output: 
{
	"message": "friend request sent",
	"success": true
}

**checking for friend request from testuser** 
output:
{
	"message": "search for friend request successful",
	"friendRequests": [
		{
			"senderUsername": "testing",
			"friendUsername": "testuser"
		}
	]
}

**third test for friend request functionality successful** 