JSON to JavaScript literal
==========================

Converts this:
```
{
  "firstName": "John",
  "lastName": "Smith",
  "isAlive": true,
  "age": 25,
  "height_cm": 167.6,
  "address": {
    "streetAddress": "21 2nd Street",
    "city": "New York",
    "state": "NY",
    "postalCode": "10021-3100"
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "212 555-1234"
    },
    {
      "type": "office",
      "number": "646 555-4567"
    }
  ],
  "children": [],
  "spouse": null
}
```
to this:
```
{
    firstName: 'John',
    lastName: 'Smith',
    isAlive: true,
    age: 25,
    height_cm: 167.6,
    address: {
        streetAddress: '21 2nd Street',
        city: 'New York',
        state: 'NY',
        postalCode: '10021-3100'
    },
    phoneNumbers: [
        {
            type: 'home',
            number: '212 555-1234'
        },
        {
            type: 'office',
            number: '646 555-4567'
        }
    ],
    children: [],
    spouse: null
}
```
[Try it out!](http://clicktravel-martin.github.io/json-to-javascript-literal/)
