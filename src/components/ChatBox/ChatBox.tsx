import { useState, useEffect } from 'react';
import styles from './ChatBox.module.css';
import axios from "axios";


  
const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("")

  function handleChange(e: any){
    setMessage(e.target.value)
  }

  function handleSubmit(e: any){
    e.preventDefault();
    const fetchData = async() =>{
      try {
        const response: any = await axios.post('http://127.0.0.1:1234/v1/responses', {
          "model": "qwen2.5-coder-7b-instruct",
          "input": message,
          "reasoning": { "effort": "low" }
        });
        console.log(response.data.output[0].content.text)
      } catch (error) {
        console.error("Error", error)
      }
    };

    fetchData();
    alert(message);
  }

  return (
    <div className="section">
              <form onSubmit={handleSubmit}>
                <label htmlFor="">Enter a Message: 
                <input type="text" value={message} onChange={handleChange}/>
                </label>

                <input type="submit" />

                <br />
                <label htmlFor="">
                  Current Message Value: 
                  <p className="message-section">{message}</p>
                </label>
                
              </form>
            </div>
  )
}


export default ChatBox

