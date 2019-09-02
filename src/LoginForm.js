import React, { Component } from 'react';
import DisplayDetails from './DisplayDetails';

const INITIAL_STATE = {
    username: '',
    password: '',
    submittedUserName: '',
    submittedPass: '',
    id: ''
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE,
            latestUserName: '',
            details: [],
            detailsFetched: ''
        }
        this.submitForm = this.submitForm.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.fetchMemInfo = this.fetchMemInfo.bind(this);
        this.resetFields = this.resetFields.bind(this);
        this.deleteField = this.deleteField.bind(this);
        this.checkPromiseExample =this.checkPromiseExample.bind(this);
    }

    onChangeName(event) {
        event.preventDefault();
        this.setState({ username: event.target.value });
    }
    onChangePassword(event) {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }
    submitForm(event) {
        event.preventDefault();
        console.log("inside submit form", this.state.id);
        var updateOperation = 'No';
        if (this.state.id === '') {
            var url = 'http://localhost:5000/express_backend';
            var data = { username: this.state.username, password: this.state.password };
            //this.setState({ submittedUserName: this.state.username });
            //this.setState({ submittedPass: this.state.password });
            this.setState(() => {
                return {
                    ...this.state,
                    submittedUserName: this.state.username,
                    submittedPass: this.state.password
                }
            });
        }
        else {
            console.log(" id is selected by user, it is an update operation");
            var url = 'http://localhost:5000/updateMemInfo';
            var data = { username: this.state.username, password: this.state.password, id: this.state.id }
            this.setState({ id: '' })
            updateOperation = 'Yes';

        }
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log("Response body is " + res.body + " and response is " + res);
            res.json().then((jsonData) => {
                console.log("jsom", jsonData);
                if (updateOperation === 'No' && jsonData.affectedRows > 0) {
                    alert("Created successfully");
                    updateOperation = 'No'
                }
                if (updateOperation === 'Yes' && jsonData.affectedRows > 0) {
                    alert("updated successfully");
                    updateOperation = 'No'
                }
                this.fetchData();
                this.resetFields();
                return jsonData.affectedRows;
            })
            return "whatever";
        })
            .then(response => console.log('Success here:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));

    }

    fetchData() {
        fetch('http://localhost:5000/express_backend')
            .then(res => res.json())
            .then(detail => (this.setState({ details: detail }, () => (this.setState({ detailsFetched: "yes" },
                console.log("successfully fetched allwatches", this.state.details, this.state.detailsFetched))))))
            .catch(e => console.log('There is an issue with getting the information', e))
    }

    fetchMemInfo(member) {
        console.log("call from child component", member, member.username);
        this.setState({ username: member.name });
        this.setState({ password: member.password });
        this.setState({ id: member.id });

    }
    deleteField(event) {
        event.preventDefault();
        if (this.state.id === '') {
            alert("Select a valid ID to delete");
        }
        else {
            var url = 'http://localhost:5000/deleteField';
            var data = { id: this.state.id };
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(jsonData => {
                    console.log("checling for delete response", jsonData);
                    if (jsonData.affectedRows > 0) {
                        alert("deleted successfully");
                        this.state.id = '';
                        this.fetchData();
                        this.resetFields();
                    }
                })
                // const resValue = res.json();
                //console.log(resValue);
                //  this.fetchData();
                // })
                .then(response => console.log('Success here11:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));
        }
    }
    checkPromiseExample(){
        var promise1 =new Promise(function(resolve, reject){
            resolve('check promise eg');
        });
        var promise2 = new Promise (function(resolve,reject){
            resolve({promise1Value :promise1 , comment: "Value of promise2"});
        });
        return promise2;
    }

    setLatestUserName() {
        fetch('http://localhost:5000/latest_user')
            .then(res => res.json())
            .then(jsonData => {
                console.log("Latest user name being set is " + jsonData.name);
                this.setState({ latestUserName: jsonData.name });
            })
            .catch(e => console.log('There is an issue with getting the latest user name', e));
    }
    resetFields1(e) {
        //   this.setState(this.getInitialState());
    }
    resetFields = () => {
        this.setState(() => {
            return {
                ...INITIAL_STATE, //spread operator
                latestUserName: this.state.latestUserName,
                details: this.state.details,
                detailsFetched: this.state.detailsFetched
            }
        });
        console.log("checking state", this.state);
    }

    componentDidMount() {
        this.setLatestUserName();
        this.fetchData();

        //calling Promise code
        var returnfromPromise = this.checkPromiseExample();
        returnfromPromise.then((value) => {
            console.log("inside first then block");
            console.log(value.comment);
            console.log(value.promise1Value);
            return value.promise1Value;
        }).then((promise1)=> {
            console.log(promise1);
            
        })
        console.log("chekcing");
        var a,b;
        returnfromPromise.then((value) =>{
            console.log("inside second then block");
             a = value.comment;
            
            value.promise1Value.then((val) => {
                b= val;
                console.log("b",b);
                console.log ("a,b final",a,b);
            })
            console.log ("a,b check",a,b);
        } )
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitForm} >
                    <h2> Welcome to our website</h2>
                    <h4>Hello, The last entered username is {this.state.latestUserName}</h4>
                    {((this.state.id) !== "") && <h5>You are editing ID {this.state.id}</h5>}
                    <br /><br />
                    <label>Username
                  <input type="text" value={this.state.username} onChange={this.onChangeName} />
                    </label>
                    <br />
                    <label>Password
                  <input type="text" value={this.state.password} onChange={this.onChangePassword} />
                    </label>
                    <br /> <br />
                    <input type="submit" value="Submit" />

                    <input type="button" value="Reset" onClick={this.resetFields} />
                    <input type="button" value="Delete" onClick={this.deleteField} />
                    {console.log("detailsFetched", this.state.detailsFetched)}
                </form>
                {
                    // (this.state.submittedUserName !== "") && (this.state.submittedPass !== "") && 

                    (this.state.detailsFetched !== "") &&
                    <DisplayDetails submittedUserName={this.state.submittedUserName} submittedPass={this.state.submittedPass}
                        details={this.state.details} fetchMemInfo={this.fetchMemInfo} />
                }
            </div>
        )
    }
}
export default LoginForm;