import React from 'react'
import classes from './Post.module.css'

type PropsType = {
    message: string
    likes: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.post}>
            <div className={classes.item}>
                <img src="https://media.vanityfair.com/photos/5c5325d3cec32271820c6fc1/master/w_1600%2Cc_limit/ava-max-interview.jpg" alt="ava1" />
                {props.message}
                <div>
                    <span className={classes.likeButton}>
                       {props.likes? props.likes: 0 } likes
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Post