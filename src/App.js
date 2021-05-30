import React from "react";


class Form extends React.Component {
  state = {
    devices: [{check:"", name:"", password:""}],  
    readonly: false,
    passwordShown : false
  }
handleChange = (e) => {
    if (["name", "password"].includes(e.target.className) ) {
      let devices = [...this.state.devices]
      devices[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
      this.setState({ devices }, () => console.log(this.state.devices))
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() })
    }
  }
addDevice = (e) => {
    this.setState((prevState) => ({
    devices: [...prevState.devices, {check:"",name:"", password:""}],
    }));
  }

  deleteDevice = (e) =>{
    console.log(this.state.devices.filter( item=> item.name !== 'A'));  // Device name not A are get fillter  Id based delete can 
    this.setState( { devices: this.state.devices.filter( item=> item.name !== 'A') });
  }
handleSubmit = (e) => { 
    e.preventDefault() 
    alert(JSON.stringify(this.state.devices));
}

setDefaultPwd = (e) =>{

  console.log(this.state.devices[0].password, e.target.checked);
  let firstPwd = this.state.devices[0].password;
  this.setState({readonly : e.target.checked});

  if(e.target.checked){
    this.state.devices.forEach( item =>{
      item['password'] =firstPwd;
    })
    console.log(JSON.stringify(this.state.devices));
  }
  else{

  }
}

pwdChange = (e) =>{
  let firstPwd = this.state.devices[0].password;
  if(this.state.readonly === true){   
    this.state.devices.forEach( item =>{
      item['password'] =firstPwd;
    })
  }
}

togglePasswordVisiblity = (e) =>{
  this.setState( {passwordShown : !this.state.passwordShown});
}
render() {
    let { devices} = this.state
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange} >
        {/* <label htmlFor="name">Owner</label> 
        <input type="text" name="owner" id="owner" value={owner} />
        <label htmlFor="description">Description</label> 
        <input type="text" name="description" id="description" value={description} /> */}
        <button onClick={this.addDevice}>Add new Device</button>
        <button onClick={this.deleteDevice}>Delete Device/s</button>
        {
          devices.map((val, idx)=> {
            let deviceId = `Device Name-${idx}`, passwordId = `Password-${idx}`,checkId = `check-${idx}`
            return (
              <div key={idx}>
                  <input
                  type="checkbox"
                  name={checkId}
                  data-id={idx}
                  id={checkId}
                  value={devices[idx].checked} 
                  className="check"
                />
                <label htmlFor={deviceId}>{`Device #${idx + 1}`}</label>
                <input
                  type="text"
                  name={deviceId}
                  data-id={idx}
                  id={deviceId}
                  value={devices[idx].name} 
                  className="name"
                />
                <label htmlFor={passwordId}>password</label>
                  { idx === 0 ?
                  <input
                    type={this.state.passwordShown ? "text" : "password"}
                    name={passwordId}
                    data-id={idx}
                    id={passwordId}
                    value={devices[idx].password} 
                    className="password"
                    readOnly={ idx === 0 ? `` : `${this.state.readonly}`}
                    onChange={this.pwdChange}
                  /> :  
                    '' }
                  { idx >0 ?
                  <input
                  type={this.state.passwordShown ? "text" : "password"}
                  name={passwordId}
                  data-id={idx}
                  id={passwordId}
                  value={devices[idx].password} 
                  className="password"
                  readOnly={this.state.readonly}
                  onChange={this.pwdChange}
                /> : 
                '' }
                {idx === 0 ? <><span onClick={this.togglePasswordVisiblity}> pwd Show/Hide:</span>  <input type="checkbox" onChange={this.setDefaultPwd}/> Set password for other devices </>: ''  }
              </div>
            )
          })
        }
        <input type="submit" value="Submit" /> 
      </form>
    )
  }
}
export default Form;