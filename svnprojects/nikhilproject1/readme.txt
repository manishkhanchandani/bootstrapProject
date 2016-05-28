9/27/2015
var ref = new Firebase('https://nikhilkhanchandani.firebaseio.com/project1');
undefined
users = ref.child('users');
U {k: Kh, path: K, n: Zd, jc: false}
jobs = ref.child('jobs')'
VM2644:2 Uncaught SyntaxError: Unexpected token ILLEGAL(…)InjectedScript._evaluateOn @ VM801:904InjectedScript._evaluateAndWrap @ VM801:837InjectedScript.evaluate @ VM801:693
jobs = ref.child('jobs');
U {k: Kh, path: K, n: Zd, jc: false}
user1 = users.child('bhani');
U {k: Kh, path: K, n: Zd, jc: false}
user2 = users.child('nihar')
U {k: Kh, path: K, n: Zd, jc: false}
user1.set({name:'bhani', age:39});
undefined
user2.set({name:'nihar', age:0});
undefined
cali = jobs.child('ca');
U {k: Kh, path: K, n: Zd, jc: false}
cali.push({title:'firebase job', salary:150000, type:'fulltime'});
U {k: Kh, path: K, n: Zd, jc: false}
cali.push({title:'php job', salary:150000, type:'fulltime'});
U {k: Kh, path: K, n: Zd, jc: false}