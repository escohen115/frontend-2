import React, { useState } from "react"
import { Card, Button } from 'semantic-ui-react'
import BackEndBookCard from '../BookIndex/BackEndBookCard'

export default function WaitList({waitlistMapped, user, savedBooks}){
    const [waitlistIndex, setWaitlistIndex] = useState(0)

    let waitingsMapped = []

     //get all unfulfilled waitings for a user
    let waitingsUnfulfilled = user.waitings.filter(waiting=>waiting.fulfilled!==true)
    for(let i=0;i<waitingsUnfulfilled.length;i++){
        waitingsMapped.push(savedBooks.find(saved_book => saved_book.id === waitingsUnfulfilled[i].book_id))
    } 
    if (waitingsMapped.length > 0){
        waitlistMapped = waitingsMapped.map(waiting=>{ //create JSX of books
            return (<BackEndBookCard book={waiting}/>)
        })
    }       

    function handleNextClick(){
        if (waitlistIndex < waitlistMapped.length){
            if (waitlistMapped.length - waitlistIndex > 8){
                setWaitlistIndex(waitlistIndex+8)
            }
            else{
            setWaitlistIndex(0)
            }
        }
    }
    if (waitingsMapped.length > 0 ){
        return(
        <>
            <div className="userpage-book-display">
                <Card.Group itemsPerRow={8}>
                    {waitlistMapped.slice(waitlistIndex, waitlistIndex+8)}  
                </Card.Group>
            </div>
            <Button className="next-back-button"  onClick={handleNextClick}>Next</Button>
            {waitlistIndex > 0 ? <Button className="next-back-button"  onClick={()=>setWaitlistIndex(waitlistIndex-8)}>Back</Button>: null}
        </>
        ) 
    }    
    else{
        return null
    }
    
}