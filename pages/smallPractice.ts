import { APIRequestContext, APIResponse, request } from "@playwright/test";
import { countries_data, Country } from "../testData/countriesData";

const nums = [9.81, 3.14, 100, 37]
// console.log(nums.sort((a, b) => a - b));

const users = [
    { name: 'Asabeneh', age: 150 },
    { name: 'Brook', age: 50 },
    { name: 'Eyob', age: 100 },
    { name: 'Elias', age: 22 },
]
users.sort((a, b) => {
    if (a.age < b.age) return 1
    if (a.age > b.age) return -1
    return 0
})
// console.log(users);

export class user {
    private _name: string = ''
    private _age: number = 0

    set name(value: string) {
        if (value.length === 0) throw new Error(`Name cannot be empty`)
        this._name = value
    }

    get name(): string {
        return this._name
    }

    set age(value: number) {
        if (value <= 0) throw new Error(`Age cannot be less than or equal to 0`)
        this._age = value
    }

    get age(): number {
        return this._age
    }


    async simpleGetRequest(url: string) {
        const apiContext: APIRequestContext = await request.newContext()
        const apiResponse: APIResponse = await apiContext.get(url)
        return apiResponse
    }
}

// const obj = new user()
// obj.name = 'Sundar'
// obj.age = 25
// console.log(`Name & Age of user are ${obj.name}: ${obj.age}`);
// console.log(0.1 + 0.2);

// console.log("He said \"Hello World!\"");

let country: string = 'Finland'
// // console.log(country.substr(3, 6));
// console.log(country.substring(3));
// console.log(country.substring(3, 9));
// console.log(country.substring(3, 4));
// console.log(country.substring(0, 3));
// console.log(country.concat('is', 'a', 'separate', 'country'));
let txt = 'In 2019, I ran 30 Days of Python. Now, in 2020 I am super exited to start this challenge'
let regExp = /\d+/g
// console.log(txt.match(regExp));
let num = 9.8
// console.log(Math.ceil(num) == 10);

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// console.log(getRandomNumber(200, 255));

function reverseString3(str: string): string {
    let reversed: string = ''
    for (const char of str) {
        reversed = char + reversed
    }
    return reversed
}
// console.log(reverseString3('Hello World!'));

function removeWhitespaces(str: string): string {
    let result: string = ''
    // for(const char of str) {
    //     if(char !== ' ' && char !== '\t' && char !== '\n') {
    //         result += char
    //     }
    // }
    result = str.replaceAll(/\s+/g, '')
    return result
}
// console.log(removeWhitespaces('   Hello   World     !    '));

function countVowels(str: string): number {
    let count: number = 0
    const vowels: string[] = ['a', 'e', 'i', 'o', 'u']
    for (const char of str.toLowerCase()) {
        if (vowels.includes(char)) {
            count++
        }
    }
    return count
}
// console.log(countVowels('Hello World!'));

function findDuplicateCharacters(str: string): void {
    const map = new Map<string, number>()
    for (const char of str) {
        if (map.has(char)) {
            map.set(char, map.get(char)! + 1)
        } else {
            map.set(char, 1)
        }
    }
    map.forEach((count, char) => {
        if (count > 1 && char !== ' ') {
            console.log(`Duplicate chars in str are ${char} : ${count}`);
        }
    })
    // for(const [char, count] of map.entries()) {
    //     if(count > 1 && char !== ' ') {
    //         console.log(`Duplicate chars in str are ${char} : ${count}`);
    //     }
    // }
}
// findDuplicateCharacters('B  ett er Butte r')

function equalityOfArrays(arr1: any[], arr2: any[]): boolean {
    let isEqual: boolean = true
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            isEqual = false
            break
        }
    }
    return isEqual
}
// console.log(equalityOfArrays([2, 5, 1, 3, 4], [2, 5, 1, 7, 4]));

function anagram(str1: string, str2: string): boolean {
    // const normalize = (str: string): string => {
    //     return str.toLowerCase().replaceAll(/\s+/g, '').split('').sort().join('')
    // }
    // return normalize(str1) === normalize(str2)

    const map = new Map<string, number>()
    const normalizeStr1 = str1.toLowerCase().replaceAll(/\s+/g, '')
    const normalizeStr2 = str2.toLowerCase().replaceAll(/\s+/g, '')
    if (normalizeStr1.length !== normalizeStr2.length) return false
    for (let i = 0; i < normalizeStr1.length; i++) {
        const char = normalizeStr1[i]
        if (map.has(char)) {
            map.set(char, map.get(char)! + 1)
        } else {
            map.set(char, 1)
        }

        const char2 = normalizeStr2[i]
        if (map.has(char2)) {
            map.set(char2, map.get(char2)! - 1)
        } else {
            map.set(char2, -1)
        }
    }

    map.forEach((count, char) => {
        if (count !== 0) {
            console.log(`${char} : ${count}`);
            return false
        } else {
            console.log(`${char} : ${count}`);
        }
    })
    return true
}
// const val = anagram('listen', 'silent')
// console.log(`Given strings are Anagram: ${val}`);

function armstrongNumber(num: number): boolean {
    // const numStr = num.toString()
    // const numDigits = numStr.length
    // let sum = 0
    // for(const digit of numStr) {
    //     sum += Math.pow(parseInt(digit), numDigits)
    // }
    // if(sum === num) {
    //     return true
    // } else {
    //     return false
    // }

    let copyNum = num
    const numLength = num.toString().length
    let sum = 0
    while (copyNum > 0) {
        const digit = copyNum % 10
        let power = 1
        for (let i = 0; i < numLength; i++) {
            power *= digit
        }
        sum += power
        copyNum = Math.floor(copyNum / 10)
    }
    return sum === num
}
// console.log(armstrongNumber(154));

function sumOfDigits(num: number): number {
    let sum: number = 0
    while (num > 0) {
        sum += num % 10
        num = Math.floor(num / 10)
    }
    return sum
}
// console.log(sumOfDigits(1234));

function kanukkoTwo(num: number[]): number {
    let firstLargest = num[0]
    let secondLargest = num[1]
    if (secondLargest > firstLargest) {
        [firstLargest, secondLargest] = [secondLargest, firstLargest]
    }

    for (let i = 2; i < num.length; i++) {
        if (num[i] > firstLargest) {
            secondLargest = firstLargest
            firstLargest = num[i]
        } else if (num[i] < firstLargest && num[i] > secondLargest) {
            secondLargest = num[i]
        }
    }
    return secondLargest
}
// console.log(kanukkoTwo([45, 51, 28, 75, 49, 42]));

function countOccurrences(str: string): void {
    const map = new Map<string, number>()

    for (const char of str) {
        if (map.has(char)) {
            map.set(char, map.get(char)! + 1)
        } else {
            map.set(char, 1)
        }
    }

    map.forEach((count, char) => {
        if (char !== ' ') {
            console.log(`${char} : ${count}`);
        }
    })
}
// countOccurrences('Java J2EE Java JSP J2E')

function findLargestNumberWithoutDigit(num: number, digit: number): number {
    let numStr: string = num.toString()
    let largestNumStr = ''
    while (numStr.includes(digit.toString())) {
        numStr = (+numStr - 1).toString()
    }
    largestNumStr = numStr
    return parseInt(largestNumStr)
}
// console.log(findLargestNumberWithoutDigit(145, 4))

function findPairs(nums: number[], sum: number): void {
    const sortedNums = nums.sort((a, b) => a - b)
    const pairs: number[][] = []

    let i = 0
    let j = sortedNums.length - 1
    while (i < j) {
        if (sortedNums[i] + sortedNums[j] === sum) {
            pairs.push([sortedNums[i], sortedNums[j]])
            i++
            j--
        } else if (sortedNums[i] + sortedNums[j] < sum) {
            i++
        } else {
            j--
        }
    }
    console.log(`Pairs found: ${JSON.stringify(pairs)}`);
}
// findPairs([4, 5, 7, 11, 9, 13, 8, 12], 20)

function findContinuousSubarray(nums: number[], sum: number): void {
    let start = 0
    let currentSum = 0

    for (let i = start; i < nums.length; i++) {
        currentSum += nums[i]
        if (currentSum === sum) {
            console.log(`Continuous SubArray found: ${nums.slice(start, i + 1)}`)
            break
        } else if (currentSum > sum) {
            currentSum -= nums[start]
            start++
        }
    }
}
// findContinuousSubarray([12, 5, 31, 9, 21, 8], 45)

function removeDuplicates(nums: number[]): number[] {
    // const uniqueNums: number[] = []
    // for(const num of nums) {
    //     if(!uniqueNums.includes(num)) {
    //         uniqueNums.push(num)
    //     }
    // }
    // return uniqueNums
    const uniqueNumsSet = new Set(nums)
    return Array.from(uniqueNumsSet)
}
// console.log(removeDuplicates([1, 2, 3, 4, 3, 2, 1]));

function stringRotationOfAnother(str1: string, str2: string): boolean {
    if (str1.length !== str2.length) return false
    const combinedStr = str1 + str1
    return combinedStr.includes(str2)
}
// console.log(stringRotationOfAnother('abcd', 'cdab'));

function reverseWordsInString(str: string): string {
    const words = str.split(' ')
    let reversedStr = ''
    for (const word of words) {
        for (let i = word.length - 1; i >= 0; i--) {
            reversedStr += word[i]
        }
        reversedStr += ' '
    }
    return reversedStr.trim()
}
// console.log(reverseWordsInString('Java Concept Of The Day'));

function separateZeros(nums: number[]): number[] {
    // let countZero = 0
    // for(let i=0;i< nums.length;i++) {
    //     if(nums[i] !== 0) {
    //         nums[countZero++] = nums[i]
    //     }
    // }
    // nums.fill(0, countZero)
    // return nums

    let countZero = nums.length - 1
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] !== 0) {
            nums[countZero--] = nums[i]
        }
    }
    nums.fill(0, 0, countZero + 1)
    return nums

}
// console.log(separateZeros([14, 0, 5, 2, 0, 3, 0]))

function separateEvenAndOdd(nums: number[]): number[] {
    const result: number[] = []

    for (const n of nums) {
        if (n % 2 === 0) {
            result.push(n)
        }
    }
    for (const n of nums) {
        if (n % 2 !== 0) {
            result.push(n)
        }
    }

    return result
}
// console.log(separateEvenAndOdd([1,2,3,4,5,6,7,8,9]));

function findLeaders(nums: number[]): number[] {
    const leaders: number[] = []
    let bigNum = nums[nums.length - 1]
    leaders.push(bigNum)
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] > bigNum) {
            leaders.push(nums[i])
            bigNum = nums[i]
        }
    }

    return leaders
}
// console.log(findLeaders([7, 10, 4, 10, 6, 5, 2]));

function reverseUntilPalindrome(num: number): number {
    let numStr = num.toString()
    let reversedNumStr = numStr.split('').reverse().join('')

    while (numStr !== reversedNumStr) {
        numStr = (parseInt(numStr) + parseInt(reversedNumStr)).toString()
        reversedNumStr = numStr.split('').reverse().join('')
    }
    return parseInt(numStr)
}
// console.log(reverseUntilPalindrome(7325));

function preserveSpaces(str: string): string {
    let i = 0;
    let j = str.length - 1
    const strArr = str.split('')
    while (i < j) {
        if (strArr[i] && strArr[j] !== ' ') {
            const temp = strArr[i]
            strArr[i] = strArr[j]
            strArr[j] = temp
            i++
            j--
        }
        if (strArr[j] === ' ') {
            j--
        }
        if (strArr[i] === ' ') {
            i++
        }
    }
    return strArr.join('')
}
// console.log(preserveSpaces('I Am Not String'))

function findMissingNumber(nums: number[], val: number): number {
    const expectedSum = (val * (val + 1)) / 2
    const actualSum = nums.reduce((sum, num) => sum + num, 0)
    return expectedSum - actualSum
}
// console.log(findMissingNumber([1, 4, 5, 3, 7, 8, 6], 8))

function findLongestWord(str: string): string {
    const words = str.split(' ')
    let longestWord = ''
    for (const word of words) {
        if (word.length > longestWord.length) {
            longestWord = word
        }
    }
    return longestWord
}
// console.log(findLongestWord('Web Development Tutorial'));

function findSecondSmallest(nums: number[]): number {
    let firstSmallest = nums[0]
    let secondSmallest = nums[1]
    if (secondSmallest < firstSmallest) {
        [firstSmallest, secondSmallest] = [secondSmallest, firstSmallest]
    }

    for (let i = 2; i < nums.length; i++) {
        if (nums[i] < firstSmallest) {
            secondSmallest = firstSmallest
            firstSmallest = nums[i]
        } else if (nums[i] > firstSmallest && nums[i] < secondSmallest) {
            secondSmallest = nums[i]
        }
    }
    return secondSmallest
}
// console.log(findSecondSmallest([45, 51, 28, 75, 49, 42]));

function longestSubstringWithoutRepeatingChars(str: string): string {
    let longestSubstring = ''
    let start = 0
    const map = new Map<string, number>()

    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i)

        if (map.has(char) && map.get(char)! >= start) {
            start = map.get(char)! + 1
        }
        map.set(char, i)

        const currentSubstring = str.slice(start, i + 1)
        if (currentSubstring.length > longestSubstring.length) {
            longestSubstring = currentSubstring
        }
    }
    return longestSubstring
}
// console.log(longestSubstringWithoutRepeatingChars('javaconceptoftheday'));

function removeDuplicatesFromArray(arr: number[]) {
    const set = new Set(arr)
    console.log(Array.from(set));
}
// removeDuplicatesFromArray([4, 3, 2, 4, 9, 2])

function stringMtds() {
    const stmt = `This a long statement to check the string methods. I believe there are more than 20+ methods as of 2026`
    console.log(stmt.substring(7, 11)); //subString takes start & end parameters, but it doesn't include the end value. So, it's better to give +1
    console.log(stmt.startsWith(`a long`, 5)) //startsWith takes first argument and checks if the string statement starts with the mentioned argument, case sensitive. Returns true/false
    console.log(stmt.endsWith(`long`, 11))  //endsWith takes first arg and checks if the string stmt end with the mentioned argument. Second argument is for position, 'long' ends at position 10+1
    console.log(stmt.search(/string/gi))  //search takes two type of arguments String/RegEx and returns index of it's first match else -1
    console.log(stmt.indexOf('string'));    //Although both search() and indexOf() helps to find the first match of the string - indexOf() functions faster and search works for complex patterns. We can use regex /gi to search with cas-insensitive.
    console.log(stmt.match(/\d+/g)) //This takes both string and regex as argument returns null if not found. Can use mainly to extract an array of matched regex.
}
// stringMtds()

// String to Number casting methods: const num = '10.2' parseInt(num), parseFloat(num), Number(num), '+' sign
// Number to String casting methods: const val = 9 - val.toString()

function arrayMtds() {
    // let a = 4;
    // let b = 3;
    // (a>b) ? console.log('a>b'):console.log('b>a')

    const arr = [
        'Hello', 23, true,
        [1, 2, 3, 4],
        { country: 'Finland', city: 'Helenski' },
        { skills: ["Java", "JSON", "TS"] }
    ]
    // console.log(arr[arr.length-1]);

    /* 
    Methods to manipulate array: Array, length, concat, indexOf, slice, splice, join, toString, includes, lastIndexOf, isArray, fill, push, pop, shift, unshift
    Array() is used to create an Array() -> const arr = Array() 
    fill(): creating static values with fill -> const arr = Array(8).fill(0) creates array size 8 with values '0'. It also has another two params - (value, start, end)
    concat(): To concat the arrays arr1.concat(arr2)
    length: to get array length arr.length
    indexOf(): To check if an ele exists in array, returns it's index number if exists else -1. [1,2,3,1] -> arr.indexof(1) o/p:0
    lastIndexOf(): To check and get ele last index, else -1. [1,2,3,1] -> arr.lastIndexof(1) o/p:3
    includes(): Returns boolean true/false for the ele availability
    isArray(): Array.isArray(arr)
    toString(), join(): we can convert an array toString() and also join it's elements
    slice(): To cut multiple item in range. Takes two params, start & end. But doesn't include th end
    splice(): It takes 3 params, Starting, number of times to be removed and number of items to be added
    reverse(): To reverse the array elements
    sort()
    */

    const arrNums = [1, 2, 3, 4, 5, 6]
    const arrStrs = ["Java", "JSON", "TS"]
    // console.log(Array.isArray(arrNums));
    // console.log(arrNums.toString());
    // console.log(arrStrs.join(','));
    // Splice removes 3 elements starting from index 3 and inserts 10, 11, 12
    const removedElements = arrNums.splice(3, 3, 10, 11, 12);
    console.log('Removed elements:', removedElements); // [4, 5, 6]
    console.log('Modified array:', arrNums); // [1, 2, 3, 10, 11, 12]
    // Slice doesn't mutate/change the original array. But Splice mutates the original array

}
// arrayMtds()

function remVowels(str: string): string {
    let result = ''
    // result = str.replaceAll(/[aeiou]/gi, '')
    for(const char of str){
        if(!/[aeiou]/gi.test(char)){
            result += char
        }
    }
    return result
}
// console.log(remVowels('Java Concept Of The Day'));

//Program to find most frequent char in a string
function mostFrequentChar(str: string): void {
    const normalizedStr = str.replaceAll(' ', '').toLowerCase()
    const charMap = new Map<string, number>()

    for (const char of normalizedStr) {
        charMap.set(char, (charMap.get(char) ?? 0) + 1)
    }
    // To Find Max and SecondMax

    // let maxChar = ''
    // let maxCount= 0
    // let secondMax = 0
    // let secondChar = ''
    // for(const [char, count] of charMap.entries()) {
    //     if(count > maxCount) {
    //         maxCount = count
    //         maxChar = char
    //     }else if(count > secondMax && count < maxCount){
    //         secondChar = char
    //         secondMax = count
    //     }
    // }

    // if (secondMax) {
    //     console.log(`Most frequent char is '${secondChar}' with count ${secondMax}`)
    // } else {
    //     console.log('String is empty or contains only spaces')
    // }

    let minChar = ''
    let minCount = 100
    for (const [char, count] of charMap.entries()) {
        if (count < minCount) {
            minCount = count
            minChar = char
        }
    }
    console.log(`Min values are ${minChar} : ${minCount}`);

}
// mostFrequentChar('Java Concept Of The Day')

// To get a function with unlimited parameteres we use spread (...) operator in arguments
function randomFun(...numbers: number[]) {
    let sum = 0
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i]
    }
    console.log(sum);
}
// randomFun(1,4,2,4,5,25)

const person = {
    firstName: 'Mahesh',
    lastName: 'Babu',
    age: 47,
    address: {
        street: 'Test',
        city: 'Hyderabad',
        country: 'India'
    },
    skills: ['Acting', 'Modeling'],
    getPersonInfo: function () {
        return `I Am SuperStar ${this.firstName + this.lastName}, Aged ${this.age}, lives in ${this.address.city}. Profession is ${this.skills.splice(0, 1)}`
    }
}

// To copy an object
const copyPerson = Object.assign(person)
// console.log(copyPerson);

// To get Key & Values. We can get separately or both
const entries = Object.entries(copyPerson)
// console.log(entries);

// console.log(person.getPersonInfo());
interface userInfo {
    email: string;
    skills: string[];
    age: number;
    isLoggedIn: boolean;
    points: number;
}
interface usersDetailsGeneric {
    [userName: string] : userInfo
}

const usersDetails: usersDetailsGeneric = {
    Alex: {
        email: 'alex@alex.com',
        skills: ['HTML', 'CSS', 'JavaScript'],
        age: 20,
        isLoggedIn: false,
        points: 30
    },
    Asab: {
        email: 'asab@asab.com',
        skills: ['HTML', 'CSS', 'JavaScript', 'Redux', 'MongoDB', 'Express', 'React', 'Node'],
        age: 25,
        isLoggedIn: false,
        points: 50
    },
    Brook: {
        email: 'daniel@daniel.com',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux'],
        age: 30,
        isLoggedIn: true,
        points: 51
    },
    Daniel: {
        email: 'daniel@alex.com',
        skills: ['HTML', 'CSS', 'JavaScript', 'Python'],
        age: 20,
        isLoggedIn: false,
        points: 40
    },
    John: {
        email: 'john@john.com',
        skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Redux', 'Node.js'],
        age: 20,
        isLoggedIn: true,
        points: 50
    },
    Thomas: {
        email: 'thomas@thomas.com',
        skills: ['HTML', 'CSS', 'JavaScript', 'React'],
        age: 20,
        isLoggedIn: false,
        points: 40
    },
    Paul: {
        email: 'paul@paul.com',
        skills: ['HTML', 'CSS', 'JavaScript', 'MongoDB', 'Express', 'React', 'Node'],
        age: 20,
        isLoggedIn: false,
        points: 40
    }
}

const testTesting = (users: usersDetailsGeneric): string => {
    let maxPoints = 0
    for(const person in users) {
        if(users[person].isLoggedIn === true && users[person].points > maxPoints) {
            maxPoints = users[person].points
            return `${person} with maxPoints: ${maxPoints}`
        }
    }
    return ''
}
// console.log(testTesting(usersDetails));

const findMostSkilled = (users: Record<string, { email: string, skills: string[], age: number }>): string | null => {
    let maxSkills = 0
    let skilledPerson = null
    let skillsArr: string[] = []
    let personAge: number = 0

    for (const person in users) {
        const skills = users[person].skills
        const skillCount = users[person].skills.length
        const age = users[person].age
        if (skillCount > maxSkills && age > personAge) {
            maxSkills = skillCount
            skilledPerson = person
            skillsArr = skills
            personAge = age
        }
    }
    return `Max skilled person is ${skilledPerson} with skills: ${skillsArr} and He/She's just ${personAge}`
}
// console.log(findMostSkilled(usersDetails));

const findMostSkilledWithInterface = (users: usersDetailsGeneric): string | null => {
    let maxSkills = 0
    let skilledPerson = ""
    let skillsArr: string[] = []
    
    for(const person in users) {
        const skillsCount = users[person].skills.length
        if(skillsCount > maxSkills) {
            maxSkills = skillsCount
            skilledPerson = person
            skillsArr = users[person].skills
        }
    }
    return `Skilled person is ${skilledPerson} with skills ${skillsArr} with total ${maxSkills}`
}
// console.log(findMostSkilledWithInterface(usersDetails));

const countUsersByCriteria = (users: Record<string, { isLoggedIn: boolean, points: number }>) => {
    let highestPoints = 50
    let skilledPerson = ""
    let loggedInUsersCount = 0

    for (const person in users) {
        if (users[person].points >= highestPoints && users[person].isLoggedIn === true) {
            loggedInUsersCount++
            skilledPerson = person
            highestPoints = users[person].points

        }
    }
    return `Total loggedInUsers count is ${loggedInUsersCount} & user having point equal to 50 is ${skilledPerson}: ${highestPoints}`
}
// console.log(countUsersByCriteria(usersDetails));

// console.log(Object.keys(usersDetails));  To get properties
// console.log(Object.values(usersDetails)); To get all values
const findMernDevs = (users: Record<string, { skills: string[] }>) => {
    const mernSkills = ['MongoDB', 'Express', 'React', 'Node'];
    let mernDev: string[] = []

    for (const person in users) {
        const skills = users[person].skills
        const isMERNDev = mernSkills.every(skill => skills.includes(skill))
        if (isMERNDev) {
            mernDev.push(person)
        }
    }
    console.log(mernDev);
}
// findMernDevs(usersDetails)

// console.log(Object.entries(usersDetails));

const callback = (n: number) => n ** 2
// console.log(callback(3));
// Callback functions forEach, map, filter, reduce, find, every, some, sort

let arr = [1, 2, 3, 4, 5, 6]
// arr.forEach((num, index, arr) => console.log(`${index} : ${num} : ${arr}`)) // return type for forEach is void
let sum = 0
arr.forEach(val => sum += val)   // forEach is mainly used a modern iterative approach replacing regular for and forOf loops
//console.log(sum);

const scores = [
    { name: 'Asabeneh', score: 95 },
    { name: 'Lidiya', score: 98 },
    { name: 'Mathias', score: 80 },
    { name: 'Elias', score: 50 },
    { name: 'Martha', score: 85 },
    { name: 'John', score: 100 },
]
// console.log(scores.filter(score => score.score>85));

const sortedResult = scores.sort((a,b) => {
    if(a.score > b.score) return -1
    if(a.score < b.score) return 1
    return 0
})
// console.log(sortedResult);

const bools = [true, false, false, false]
// console.log(bools.some((val) => val === true)); // Checks if atleast 1 value is true, returns true
// console.log(bools.every((val) => val === true));    // Checks if all values matches true, returns false here

const numbers = [9.81, 3.14, 100, 37]
// console.log(numbers.sort((a,b) => a-b));
// console.log((numbers.sort((a,b)=> b-a)));

// const usersArr = [
//   { name: 'Asabeneh', age: 150 },
//   { name: 'Brook', age: 50 },
//   { name: 'Eyob', age: 100 },
//   { name: 'Elias', age: 22 },
// ]   // sorts by age in descending order
// console.log(usersArr.sort((a,b) => {
//     if(a.age > b.age) return -1
//     if(a.age < b.age) return 1
//     return 0
// }));



function categorizeCountries(countries: string[]) {
    const pattern = /land|ia|island|stan/gi
    return countries.filter(country => pattern.test(country))
}
// console.log(categorizeCountries(countriesLocal));

function countStartingLetters(countries: string[]) {
    const letterCountMap = countries.reduce<Record<string, number>>((acc, country) => {
        if (country.length > 1) {
            const firstLetter: string = country.charAt(0).toUpperCase()
            acc[firstLetter] = (acc[firstLetter] || 0) + 1
        }
        return acc
    }, {})

    console.log(letterCountMap);
    return Object.entries(letterCountMap).map(([letter, count]) => ({
        letter,
        count
    }))
}
// console.log(countStartingLetters(countriesLocal));

const sortedData = countries_data.sort((a, b) => {
    const nameCompare = a.name.localeCompare(b.name)
    const capitalCompare = (a.capital || '').localeCompare(b.capital || '')
    const populationCompare = a.population - b.population

    return nameCompare || capitalCompare || populationCompare
})
// console.log(sortedData);

function mostPopulatedCountries(countries: { name: string; capital?: string; population: number }[]) {
    return [...countries]
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
}
// console.log(mostPopulatedCountries(countries_data));

const languages = [
    'English',
    'Finnish',
    'English',
    'French',
    'Spanish',
    'English',
    'French',
]
const filteredLangs: string[] = languages.filter((lang) => lang.includes('ish')).map((lang) => lang.toUpperCase().slice(0,3))
// console.log(filteredLangs);

function countLangs(languages: string[]) {
    // const langSet = new Set(languages)
    // let counts = []

    // for(const l of langSet) {
    //     const filteredLang = languages.filter((lng) => lng === l)
    //     counts.push({lang: l, count: filteredLang.length})
    // }
    // return counts

    const langMap = languages.reduce<Record<string, number>>((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1
        return acc
    }, {})

    return Object.entries(langMap).map(([lang, count]) => ({ lang, count }))
}
// console.log(countLangs(languages));

let a = [1, 2, 3, 4, 5]
let b = [3, 4, 5, 6]
let c = [...a, ...b]    //We use spread operator for find union of two arrays
// console.log(`Union of arrays ${c}`);
// const set = new Set(c)
// console.log(set);
let d = a.filter(val => b.includes(val))    //To find the intersection of 2 arrays we can use filter
// console.log(d);

const countriesAgain: [string, string][] = [
    ['Finland', 'Helsinki'],
    ['Sweden', 'Stockholm'],
    ['Norway', 'Oslo'],
]   //To create Map from an array
// const map = new Map(countriesAgain)
// console.log(map.keys())

function countUniqueLanguages(countries: typeof countries_data) {
    const uniqueLang = new Set<String>()
    countries.forEach(country => {
        country.languages.forEach(language => {
            uniqueLang.add(language)
        })
    });
    return [uniqueLang, uniqueLang.size]
}
// const [uniqueLangs, uniqueLangsCount] = countUniqueLanguages(countries_data)
// console.log(`Unique Langs count is ${uniqueLangsCount}`);

function checkPalindrome(number: number) {
    let reversedNum = ""
    const str = number.toString()

    for (let i = str.length - 1; i >= 0; i--) {
        reversedNum += str[i]
    }

    if (number === parseInt(reversedNum)) {
        return true
    } else {
        return false
    }
}
// console.log(checkPalindrome(8427248));

function checkPalindromeWithStr(str: string) {
    // str = str.toLowerCase()
    // let reversedStr = ""

    // for(let i=str.length-1;i>=0;i--){
    //     reversedStr += str[i]
    // }

    // if(str === reversedStr) {
    //     return true
    // }else {
    //     return false
    // }

    let cleanStr = str.replaceAll(/\s+/g, '').toLowerCase()
    let forward = 0
    let backward = cleanStr.length - 1

    while (forward <= backward) {
        if (cleanStr[forward] !== cleanStr[backward]) {
            return false
        }
        forward++
        backward--
    }
    return true
}
// console.log(checkPalindromeWithStr("Madam"));

function swapTwoStrings(s1: string, s2: string) {
    s1 = s1 + s2
    s2 = s1.substring(0, s1.length - s2.length)
    s1 = s1.substring(s2.length)

    console.log(`s1 is ${s1}, s2 is ${s2}`);
}
// swapTwoStrings("JAVA", "Typescript")

function swapNumbers(n1: number, n2: number) {
    n1 = n1 + n2
    n2 = n1 - n2
    n1 = n1 - n2

    console.log(`n1 is ${n1}, n2 is ${n2}`);
}
// swapNumbers(9, 5)

const fullStack = [['HTML', 'CSS', 'JS', 'React'], ['Node', 'Express', 'MongoDB']]
// const [frontEnd, backEnd]:string[][] = fullStack
// console.log(frontEnd);

const numbers2: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const [num1, num2, ...rest] = numbers2
// console.log(`num1 is ${num1}, num2 is ${num2}, rest are ${rest}`);

// Descructuring using loop
// for(let [first, second, third] of fullStack) {
//     console.log(first, second, third);
// }

const newPerson = {
    firstName: 'Asabeneh',
    lastName: 'Yetayeh',
    age: 250,
    country: 'Finland',
    job: 'Instructor and Developer',
    skills: [
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'Redux',
        'Node',
        'MongoDB',
        'Python',
        'D3.js'
    ],
    languages: ['Amharic', 'English', 'Suomi(Finnish)']
}

const getNewPersonInfo = (obj: { firstName: string, lastName: string, age: number, country: string, job: string, skills: string[], languages: string[] }) => {
    const skills = obj.skills
    const formattedSkills = skills.slice(0, -1).join(', ')
    const languages = obj.languages
    const formattedLanguages = languages.slice(0, -1).join(', ')

    const personInfo = `${obj.firstName} ${obj.lastName} lives in ${obj.country}. He is  ${obj.age} years old. He is an ${obj.job}. He teaches ${formattedSkills} and ${skills[skills.length - 1]
        }. He speaks ${formattedLanguages} and a little bit of ${languages[2]}.`

    console.log(personInfo);
}

// // Define an interface for the person object structure
// interface Person {
//   firstName: string;
//   lastName: string;
//   age: number;
//   country: string;
//   job: string;
//   skills: string[];
//   languages: string[];
// }

// const getNewPersonInfo = (obj: Person) => {
//     const skills = obj.skills
//     console.log(skills);
// }
// getNewPersonInfo(newPerson)

const str = 'I love JavaScript'
const pattern = /love/gi
const result = pattern.test(str)
// console.log(result);

const sentence = `%I $am@% a %tea@cher%, &and& I lo%#ve %tea@ching%;. There $is nothing; &as& mo@re rewarding as educa@ting &and& @emp%o@wering peo@ple. ;I found tea@ching m%o@re interesting tha@n any other %jo@bs. %Do@es thi%s mo@tivate yo@u to be a tea@cher!?`
function cleanText(sentance: string) {
    return sentance.replaceAll(/[^A-Za-z0-9]/gi, ' ')
}
//   console.log(cleanText(sentence))

const newSentance = 'I am a teacher and I love teaching There is nothing as more rewarding as educating and empowering people I found teaching more interesting than any other jobs Does this motivate you to be a teacher'
function mostFrequentWord(sentance: string) {
    const counted = sentance.split(' ').reduce<Record<string, number>>((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1
        return acc
    }, {})

    return Object.entries(counted).map(([word, count]) => ({ word, count }))
}
// console.log(mostFrequentWord(newSentance));

class Person {
    protected readonly firstName
    protected readonly lastName
    protected age: number
    protected address: string
    protected skills: string[]
    constructor(firstName: string, lastName: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = 0
        this.address = "XXXX"
        this.skills = []
    }
    get getAge() {
        return this.age
    }
    set setAge(age: number) {
        this.age = age
    }
    set setAddress(address: string) {
        this.address = address
    }
    set setSkills(skills: string[]) {
        this.skills = skills
    }

    static favouriteSkills() {
        const skills = ['HTML', 'CSS', 'JS', 'React', 'Python', 'Node']
        const index = Math.floor(Math.random() * skills.length)
        return skills[index]
    }

    static showDateTime() {
        let now = new Date();
        const year = now.getFullYear();
        // Correctly get the month (0-indexed, so add 1) and pad with leading zero
        const month = String(now.getMonth() + 1).padStart(2, '0');
        // Correctly get the day of the month and pad with leading zero
        const day = String(now.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    }

    getUserDetails() {
        console.log(`This is ${this.firstName} ${this.lastName} aged ${this.age} having skills ${this.skills.join(', ')}, lives in ${this.address}`);
    }
}
// const objectPerson = new Person("Mukul", "Govind")
// objectPerson.setAge = 25
// objectPerson.setAddress = "Charlie Street, 18129, Meeyork"
// objectPerson.setSkills = ['HTML', 'CSS', 'JS', 'React', 'Python', 'Node']
// objectPerson.getUserDetails()
// const objectPerson1 = new Person("Gurunad", "Govind")
// objectPerson1.setAge = 32
// objectPerson1.getUserDetails()
// console.log(Person.favouriteSkills());
// console.log(Person.showDateTime());

class Student extends Person {
    readonly gender
    constructor(firstName: string, lastName: string, gender: string) {
        super(firstName, lastName)
        this.gender = gender
    }
    getUserDetails(): void {    //overridden method of parent class
        console.log(`This is ${this.firstName} ${this.lastName}: Gender: ${this.gender}, Aged: ${this.age}, Skills: ${this.skills.join(', ')}, Lives in ${this.address}`);
    }
    saySomething() {
        console.log(`Child of parent Person`);
    }
}
// const objectStudent = new Student("Asbaneh", "Pyurto", 'Male')
// objectStudent.setAge = 16
// objectStudent.setAddress = "India"
// objectStudent.setSkills = ['JS', 'TS']
// objectStudent.getUserDetails()
// objectStudent.saySomething()

interface personDetails {
    firstName: string;
    lastName: string;
    age: number;
    country: string;
    skills: string[];
    getFullName: () => string;
    isMarried?: boolean;
    getPersonInfo?: () => string;
    sayHello: () => void;
}

const personDetails: personDetails = {
    firstName: 'Asbenya',
    lastName: 'Philip',
    age: 50,
    country: 'India',
    skills: [
        "Webs", "HTML", "Java", "Typescript", 'Node', 'MongoDB', 'Python', 'D3.js'
    ],
    getFullName: function(this: personDetails): string {
        return `${this.firstName} ${this.lastName}`
    },
    sayHello: function (): void {
        console.log(`Hey Hello ${this.firstName}`);
    }
}
personDetails.isMarried = true
personDetails.getPersonInfo = function(): string {
  let skillsWithoutLastSkill = this.skills
    .splice(0, this.skills.length - 1)
    .join(', ')
  let lastSkill = this.skills.splice(this.skills.length - 1)

  let skills = `${skillsWithoutLastSkill}, and ${lastSkill}`
  let fullName = this.getFullName()
  let statement = `${fullName} lives in ${this.country}.\nHe teaches ${skills}.`
  return statement
}

// personDetails.sayHello();
// console.log(personDetails.getPersonInfo());

interface User {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
}

interface UsersData {
    users: User[];
}

const usersText = `{
"users":[
  {
    "firstName":"Asabeneh",
    "lastName":"Yetayeh",
    "age":250,
    "email":"asab@asb.com"
  },
  {
    "firstName":"Alex",
    "lastName":"James",
    "age":25,
    "email":"alex@alex.com"
  },
  {
  "firstName":"Lidiya",
  "lastName":"Tekle",
  "age":28,
  "email":"lidiya@lidiya.com"
  }
]
}`
const userObject: UsersData = JSON.parse(usersText, (key, value) => {
    const newValue = typeof value === 'string' && key !== 'email' ? value.toUpperCase() : value
    return newValue
})
const filteredUsers = userObject.users.map(user => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age
    }
})
// console.log(userObject);
const newUsersText = JSON.stringify(filteredUsers, null, 4)
// console.log(newUsersText);

const extract = 'He earns 5000 euro from salary per month, 10000 euro annual bonus, 15000 euro online courses per month.'
const values = extract.match(/\d+/g)
const annualSal: number = values ? (+values[0] * 12) + parseInt(values[1]) + (Number(values[2]) * 12) : 0
// console.log(annualSal);

const str3 = 'Love is the best thing in this world. Some found their love and some are still looking for their love.'
const arr3 = str3.match(/love/gi)
// console.log(arr3?.length);

const val5: number = 2;
// (val5 % 2 === 0) ? console.log("Num is Even") : console.log("Num is Odd")

let month: string = 'Sept'
month = month.trim().toLowerCase()

// switch(month) {
//     case 'dec':
//     case 'jan':
//     case 'feb':
//         console.log('Winter');
//         break
//     case 'sept':
//     case 'oct':
//     case 'nov':
//         console.log('Autumn');
//         break
//     case 'mar':
//     case 'apr':
//     case 'may':
//         console.log('Spring');
//         break
//     case 'jun':
//     case 'jul':
//     case ' aug':
//         console.log('Summer');
//         break
//     case 'default':
//         console.log('Enter a valid month');
// }

const str5 = 'Hello'
const str6 = 'world'
// console.log(str5.concat(str6));

let text = 'I love teaching and empowering people. I teach HTML, CSS, JS, React, Python.'
text = text.replaceAll(/[^A-Za-z0-9]/g, ' ')
// console.log(text.length);

const ages = [19, 22, 19, 24, 20, 25, 26, 24, 25, 24]
const sortedAges = ages.sort()
const medianVal = Math.floor(sortedAges.length / 2)
// console.log(sortedAges[medianVal]);
const maxAge = Math.max(...sortedAges)
const minAge = Math.min(...sortedAges)
// console.log(maxAge-minAge);

function sumOfEvenOdds() {
    let evenSum = 0
    let oddSum = 0
    let i = 1
    while (i <= 100) {

        if (i % 2 === 0) {
            evenSum += i
        } else {
            oddSum += i
        }
        i++
    }
    let arrOfSums = []
    arrOfSums.push(evenSum)
    arrOfSums.push(oddSum)
    console.log(arrOfSums);
}
// sumOfEvenOdds()

function randomNum(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// console.log(randomNum(10000, 99000));

function assembleDigitsToNum(digitsArr: number[]) {
    const size = digitsArr.length
    return digitsArr.reduce((acc, curr, index) => {
        const placeValue = 10 ** (size - 1 - index)
        return acc + (placeValue * curr)
    }, 0)
}

function getRandomDigitNum(size: number) {
    const digits = new Set()

    //Get first digit
    digits.add(randomNum(9, 1))

    while(digits.size < size) {
        const nextDigit = randomNum(10, 0)
        digits.add(nextDigit)
    }

    const digitArr = [...digits]
    const randomNumber: string = digitArr.join('')
    console.log(+randomNumber);
}
// getRandomDigitNum(5)

function getRandomChars(length: number) {
    const set = new Set<string>()
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomChars = []

    while(set.size <= length) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        set.add(characters[randomIndex])
    }
    randomChars = [...set]
    return randomChars.join('')
}
// console.log(getRandomChars(10));

function findCountriesMatched() {
    let i = 0
    let arr = []
    while(i<countries_data.length){
        const countryName = countries_data[i].name
        // if(countryName.includes('land')){
        //     arr.push(countryName)
        // }
        if(countryName.length === 4) {
            arr.push(countryName)
        }
        i++
    }
    console.log(arr);
}
// findCountriesMatched()

const generateFullName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`
}
// console.log(generateFullName('Asbaneh', 'Mirothi'));

function findMax(...numbers: number[]): number {
    let largest = 0
    for(let i=0;i<numbers.length;i++) {
        if(numbers[i] > largest) {
            largest = numbers[i]
        }
    }
    return largest
}
// console.log(findMax(0, -10, -2, 4));

// const arrTitles = ['Google', 'Facebook','Apple', 'Amazon','MICROSOFT',  'IBM']
// let setTitles = new Set<string>()
// for(const title of arrTitles) {
//     setTitles.add(title)
// }
// console.log(setTitles);

const countriesLocal: string[] = ['Finland', 'Sweden', 'Denmark', 'Norway', 'IceLand']
const names: string[] = ['Asabeneh', 'Mathias', 'Elias', 'Brook']
const numberss: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const products: { product: string; price: number | string }[] = [
    { product: 'banana', price: 3 },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: 8 },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
]

const check = products.filter((product) => +product.price > 5).map((product) => product.product)
// console.log(check.join(', '));

// names.forEach(name => console.log(name))
// const newArr = names.map(name => name.length)
// console.log(newArr);
// const prices = products.map( product => product.price)
// console.log(prices);
const filteredCountries = countriesLocal.filter((countryLength) => countryLength.length === 6)
// console.log(filteredCountries);

//Get total price of products
// console.log(products.map((product) => typeof product.price === 'number' ? product.price : 0).reduce((acc, curr) => acc+curr, 0));

// console.log(countriesLocal.slice(0, countriesLocal.length-1).reduce((acc,curr) => `${acc}, ${curr}`),`and`,countriesLocal.slice(countriesLocal.length-1).join(''), `are north European countries`)
// const list = countries.filter(name => name.match(/land/gi))
// console.log(list);
// const list = countries.filter(title => title.startsWith('E'))
// console.log(list);
// const filterPrices = products.filter(product => +product.price)
// console.log(filterPrices);
let sum1 = 0
// console.log(numberss.reduce((acc, curr) => acc+curr, 0));
// console.log(countriesLocal.reduce((acc, curr) => `${acc}, ${curr}`), `are north European countries`);
// const val = names.some(name => name.length > 7)
// console.log(val);
// const val1 = countriesLocal.every(country => country.match(/land/i))
// console.log(val1);
// const totalPrice = products.map(product => +product.price).reduce((acc, curr) => acc+curr, 0)
// console.log(totalPrice);

const numeric1 = [1,2,3,4,5]
// numeric1.forEach((val, index, arr) => console.log(`val is ${val}: index ${index}: arr ${arr}`))


const totalPrice = products.reduce((acc, curr) => {
    const validPrice = typeof curr.price === 'number' ? curr.price : 0
    return acc + validPrice
}, 0)
// console.log(totalPrice);


function getFirstTenCountries(countries: Country[]) {
    return [...countries].slice(0, 10).map((country) => country.name)
}
// console.log(getFirstTenCountries(countries_data));

function mostSpokenLanguages(countries: Country[], number: number) {
    const languageMap = countries.reduce((acc, curr) => {
        curr.languages.forEach(language => {
            acc[language] = (acc[language] || 0) + 1
        })
        return acc
    }, {} as Record<string, number>)

    return Object.entries(languageMap)
        .map(([language, count]) => ({ language, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, number)

}
// console.log(mostSpokenLanguages(countries_data, 3));

function populatedCountries(countries: Country[], num: number) {
    return [...countries].sort((a,b) => b.population-a.population).slice(0, num)
}
// console.log(populatedCountries(countries_data, 10));

const usersJSON = JSON.stringify(usersDetails, undefined, 4)
// console.log(usersJSON);
const usersObj = JSON.parse(usersText)
// console.log(usersObj)

const jsonString = `{"name": "Alex", "joinedDate": "2026-06-09T07:31:00.000Z"}`
const jsonObj = JSON.parse(jsonString, (key, value) => {
    if(key === "joinedDate") {
        return new Date(value)
    }
    return value
});

// console.log(jsonObj.joinedDate.getDate());

const parsedJSON = JSON.parse(usersText, (key, value) => {
    return typeof value === 'string' && key !== 'email' ? value.toUpperCase() : value
})
// console.log(parsedJSON);

// const userPoints = undefined;
// const finalScore = userPoints ?? 10  //Nullish Coalescing is used to handle undefined or null values
// console.log(finalScore);

const student = {
  firstName:'Asabeneh',
  lastName:'Yetayehe',
  age:250,
  isMarried:true,
  skills:['HTML', 'CSS', 'JS', 'React','Node', 'Python', ]
}
// console.log(JSON.stringify(student, ['firstName', 'lastName', 'skills'], 4));

const visitorUser = { name: "Guest", preferences: {theme: undefined}}
// const activeTheme = visitorUser?.preferences?.theme??"Light"
// console.log(activeTheme);

