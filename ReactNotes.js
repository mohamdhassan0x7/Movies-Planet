/*
npm & npx :
    npm => install the library 
    npx => only excute the library to use

first of all in react project 
    npx create-react-app appName
    
// REACT is a component based Arch

//every component is a class
//state in the class holds data  ==> API
//render in the class to return data ==> return to html


//App component : the deafault component we call other component inside it

i.e 
class App
{
    state={}

    render()
    {
        <component1/> or <component1></component1>
        <component2/>
        <component3/>  
    }
}

class component1
{
    state={}
    render()
    {
        //return statment can only return one component that's why we collected all elments inside one div

        return (
            <div>

                <component1/> 
                <component2/>
                <component3/>

            </div>
        )

    }
}
.
.
.
etc

//in index.html 

div#root
<div>
<App/>
</div>



//in App1.js: we need to import the main class (component) (same as Object class all object extends it)
i.e 
import {component} from "react";
//all other classes made for components must extends component

//in index.js: - we need to import ReactDOM and import App1 
               - then we get the root elment using the dom 
               - then use render(<App1/>) ==> to implement the return of the App1 component inside it
               
//every class of a component should have (export) word before its name so we can import it later               



//the code inside the return in the render function is not a HTML code ==> it's a JSX (java script and XML) a lang made by react so we can write a HTML inside js
//so, when we make a new component will make it with CompName.jsx
//by the extension we can make the component by write rcc (react component create)

//any other packages (bootstrap , jQuery , fontAwsome) imported in index.js

__________________________________________________________________________
                        Binding
class component1
{
    state={
        v = "adfsdf"
    }
    render()
    {
        return (
            <div>

                <h1>name: {this.state.v} </h1>

            </div>
        )
    }
}   
__________________________________________________________
        transfer data from parent to child *Props*


//if we want to send data from parent to child we can set an attribute to the call of
//the child class and give it the data we want to send and recieve it in the props of the child
//we can pass a full object
class parent extens component
{
    state={
        x:{id:0 , name:'tttt', age:'18'}
    }
    render(){
        return(
            <child x={this.state.x} />
        )
    }
}        

class child extens component
{
    render(){
    //we can use destruct 
    let{id , name , age}=this.props.x;   
        return(
            <h1>{id}</h1>
            <h1>{name}</h1>
            <h1>{age}</h1>
        )
    }
}   

//if we have array of objects we want to pass to the child we can use map 
i.e

render()
{
    return(
        //any js code inside jsx should be written inside{}
        { 
            this.state.array.map( (obj)=> < child x={obj} />)
        }
    )
}

________________________________________________________________________

//if we wand to edit on some data by a function ==> the function have to be impelemented on same component that have the data
//if we want to use this function in some child we can pass it the same way as data  
//to edit on data we do it on 3 steps :
- take a deep copy of old data
    let newOne = [...this.state.oldOne]  ==> deep copy 
    let newOne = oldOne                  ==> shallow copy

- do the action 
    //we can loop on array by filter method 
    newOne = newOne.filter((obj)=> obj.id != 5)        //delete the element with id = 5
- setState({oldData:newData})
    every time setState called the render method will run again
______________________________________________________________________
**                  Component life time cycle

//mounting component made of 3 steps 
1- constructor 
    constructor(){
        super();
    }
2- Render 
3- component Did Mount
    componentDidMount(){
        //function body
    }    

    
//updating data 
1- Render
2- component Did Mount

//unmounting 
1- componentWillUnMount


//***** best place to call te API is the (Component did mount)
    ->cause the loading screen will implemented in Render and componentDidMount is the only function called after Render

//***** SPA 
    all HTML, CSS, JS code load once you open the first page, that's why all code of all pages put on App so user when send request will reply with all codes in the div#root
    
    disadvantages :
    -> first reload with take a while


<noscript></noscript>  ==> work and display sentence or hint to user if the browser disapled JS     
*/
/*
===============================================================================================
                            ************ SASS  ************
                            ************ Week2 ************
SASS => CSS preprocessor 
    - it's a css but has programming princibles like loops and variables 
    - file extenstion is style.scss
    - by extention the sass code is converted into another css file and we link this file into our index.html

=> variables:
    $variableName:value    



-----------------------------------------------------------------------------------------------------
**** Register page:
    1- make the form (each input has the same name as the data in database)   
    2- make a object using useState to save the enterd data in it as variables
    3- make a function that takes the value of the input and save it in the variables in the object
    4- make each input call this function on change
    5- make a function that send the data to the API (database)(before calling the Api we should call the 
        validation function first and check its return value if it was true call the api else return error message)
    6- on submit action (on format) call the function that save the data and in case of error show it 

                                 ----------------------------------------------
**** validation:(JOI)
    1- npm i joi
    2- import joi in the component 
    3- make function that makes the validation 
        function validation()
        {
            let scheme = joi.object({
                //(name of the data of the object to send to db):Joi.------,//
                first_name:Joi.string().alphanum().min(number).max(number),
                ----------------------------------------------------------,
                ----------------------------------------------------------,
            })
            return scheme.validate(object you want to validate,{abortEarly:(true or false)})
            //abortEarly:true => make the validation stops at the first error , false => return all errors in the form 
        }    
    4- make an array using useState holds the error that returned from the validation
       in case of errors make the array = returnvalue.error.details (=>array of errors each error has a message about what's wrong)     
       
                                 ----------------------------------------------
**** Log in page:
1) Navigate: after the registration is done! we need to navigate to the login page so the user can login
    1- import {useNavigate} from react-router-dom   //useNavigate is a hock from the dom
    2- let navigate = useNavigate()
2) in the case of all has done successful
    1- call navigate('url end point of the page we want to navigate to') 
    2- localStorage.setItem("userToken", data.token)
        //data ==> response of the API call ==> resposne.data
            response.data.message => check for errors
            response.data.token => user token   

//every time user refresh the page the userData is cleared but data still in localStorage so:
  we need to check in the component did mount of the App.jsx if the localStorage has data then restore it in userData
        --> useEffect(()=>{
            if(localStorage.getItem("userToken"))
            {
                //call the decoding function that take the token and convert it to decoded data (User Profile)
            }
        },[])

                                 ----------------------------------------------
**** User profile:
work with token  
    1- npm i jwt-decode
    2- make a variable userData using useState = NULL
    3- in App.jsx function make function to decode 
        - import jwt-decode
        - let encoded = localStorage.getItem("userToken")
        - let decoded = jwtDecode(decoded)
        - setUserData(decoded)
    4- send the whole function as a props to login component
    5- call props.function in case of all has done successful in login component  
    //we need to check the userData in navbar if it = null the menu won't de displayed and only display login and register
      but in case it's != null displat the links of navbar and only logout 

                                     ----------------------------------------------

**** Stop navigation if user didn't login :
    1- import Navigate (not useNavigate ==> diffrence: Navigate returns component)
    2- make function (protectedRoute()) 
    3- check if localStorage.getItem("userToken") === null 
        - yes: return <Navigate path="/login"/>
        - no : return props.children (treat this function as a component)
    4- put every elment in every Route in Routes inside <protectedRoute><componentName/></protectedRoute> 
    
                                     ----------------------------------------------

**** Logout :
     1- make function in App.jsx (logout)
        1- clear userData
        2- clear the token from local storage (localStorage.removeItem("--"))
        3- navigate to /login page   
    2- call this function onClick on the link in navbar    

==================================================================================================================   
Movie details page:
        1- make each movie as a Link and send the id of the move with the url 
             <Link to={"moviedetails/${movie.id}"}></Link>
        2- make nested Route in App.jsx for the movie details component 
            <Route path="moviedetails" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}>
                <Route path=":id" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
            </Route>
            //as :id is a variable sent to the component in its parameters
            //to get the parameters of the component use useParam() hock 
        3- finally use the APi that gets the movie by its id
        //imp ==> in shownig the details first check if the object != null
        
-----------------------------------------------------------------------------
                    ********** Split Css files (css file for each component) ********** 
    1- make the css file as ==> style1.module.css   --> so react will see it as a module not css file ony
    2- import it in the target component  
        import manga from "style.module.css"
    3- use as :
        className={`${manga.className1}  ${manga.className1}`}    


   inline css style:
        <h1 style = { {background-color:manga , ---- } }>mangaaaaaa</h1>     
*/