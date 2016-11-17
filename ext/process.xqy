let $name := xdmp:get-request-field('name')
let $email := xdmp:get-request-field('email')
let $canContact := xs:boolean(xdmp:get-request-field('canContact'))
let $company := if (xdmp:get-request-field('company'))
                then xdmp:get-request-field('company')
                else ()
let $collections := xdmp:get-request-field('collections[]')
let $uri := fn:lower-case(fn:concat('/attendee/', xdmp:random(), '.json'))
let $object := json:object()
let $document := json:object()
return (
  if ($company)
  then map:put($object, 'company', $company)
  else (),
  map:put($object, 'name', $name),
  map:put($object, 'email', $email),
  map:put($object, 'canContact', $canContact),
  map:put($document, 'attendee', $object),
  xdmp:log($collections),
  xdmp:document-insert($uri, xdmp:to-json($document), (), $collections),
  fn:true()
)