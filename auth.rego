package auth
default allow=false
allow if{
  input.user.role=="admin"
  input.user.role=="student"
  input.resource=="profile"
  input.action=="update"
  input.user.id==input.resource_owner_id 
} 
allow if{
  input.user.role=="student"
  input.resource=="profile"
  input.action=="read"
  input.user.id==input.resource_owner_id 
} 
allow if{
  input.user.role=="HOD"
}