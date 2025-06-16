class nodes
{
    constructor(key,data)
    {
        this.value=data;
        this.key=key;
        this.next=null;
    }
}
class hashmap
{
    constructor()
    {
        this.hashMap=[];
        this.loadFactor=0.8;
        this.capacity=16;
        this.size=0;
    }
    hash(key)
    {
        let hashcode=0;

        let primeNumber=29;
        for(let i=0;i<key.length;i++)
        {
            hashcode=(hashcode*primeNumber + key.charCodeAt(i)) % this.capacity;
        }
        return hashcode;
    }
    set(key,value)
    {
        let keyed=this.hash(key);
        if(keyed<0 || keyed>this.hashMap.length)
        {
            //throw new Error("invalid input");
        }
        if((this.hashMap[keyed]===undefined))
        {
            this.hashMap[keyed]=new nodes(key,value);
            this.size++;
            return;
        }
        let current=this.hashMap[keyed];
        let prev=null;
        while(current)
        {
            if(current.key===key)
            {
                current.value=value;
                return;
            }
            if(!current.next)
            {
                current.next=new nodes(key,value);
                this.size++;
                return;
            }
            prev=current;
            current=current.next;
        }
        prev.next=new nodes(key,value);
        this.size++;
        if(this.size> this.capacity * 0.75)
        {
            this.resize();
        }
    }
    resize()
    {
        let oldMap=this.hashMap;
        this.capacity=this.capacity*2;
        this.size=0;

        for(let buckets of oldMap)
        {
            let current=buckets;
            while(current)
            {
                this.set(current.key,current.value);
                current=current.next;
                this.size++;
            }
        }
    }
    get(key)
    {
        let current=this.hashMap[this.hash(key)];
        while(current)
        {
            if(current.key===key)
            {
                return current.value;
            }
            current=current.next;
        }
        return false;
    }
    has(key)
    {
        return this.hashMap[this.hash(key)]?true:false;
    }
    remove(key)
    {
        let got=this.get(key);
        if(got)
        {
           delete this.hashMap[this.hash(key)];
            return true;
        }
        return false;
    }
    length()
    {
       return this.size;
    }
    clear()
    {
        this.hashMap=[];
    }
    keys()
    {
        let allKeys="";
        for(let i in this.hashMap)
        {
            let current=this.hashMap[i];
            while(current)
            {
                allKeys+=`[${current.key}] `;
                current=current.next;
            }
        }
        return allKeys;
    }
    values()
    {
        let allValues="";
        for(let i in this.hashMap)
        {
            let current=this.hashMap[i];
            while(current)
            {
             allValues+=`[${current.value}] `;
             current=current.next;   
            }
        }
        return allValues;    
    }
    entries()
    {
        let allPairs="";
        for(let keys in this.hashMap)
        {
            let current=this.hashMap[keys];
            while(current)
            {
                allPairs+=`[${current.key},${current.value}]`;
                current=current.next;
            }
        }
        return allPairs;
    }
}
let test=new hashmap();

 test.set('apple', 'red')
 test.set('banana', 'yellow')
 test.set('carrot', 'orange')
 test.set('dog', 'brown')
 test.set('elephant', 'gray')
 test.set('frog', 'green')
 test.set('grape', 'purple')
 test.set('hat', 'black')
 test.set('ice cream', 'white')
 test.set('jacket', 'blue')
 test.set('kite', 'pink')
 test.set('lion', 'golden')
test.set('lion','this has been changed')


 console.log(test.length());
 console.log(test.keys());
 console.log(test.values());
console.log(test.get('lion'));
console.log(test.has('lion'));
console.log(test.remove('lion'));
console.log(test.entries());