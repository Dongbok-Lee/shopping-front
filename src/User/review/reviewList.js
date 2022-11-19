import { useEffect, useState } from "react";
// import {Link, useParams} from "react-router-dom";
import { userReviewGet } from "../../Api/ApiService";
import Hafter from '../../Header/HeaderAfter';
import UserMenuBar from "../userMenuBar";
import ReviewContent from "./reviewContent"
import "./reviewList.css"

function ReviewList({reviewSelect, setReviewSelect, cart}){
    const [userReview, setUserReview] = useState([])    //사용자가 단 리뷰 목로들이 저장될 Hooks
    // const {id} = useParams();
    // const addressState = window.location.pathname
    useEffect(() => {
        userReviewGet().then((res) => {
            setUserReview(res.data.data)
        })
        console.log("리뷰 목록 불러오기")
    },[])
    console.log(userReview)
    return(
        <div>
            <div className="Header">
                <Hafter cart={cart}/>
                <p id="review_title">리뷰목록</p>
            </div>
            <div className="Content">
                <div className="flex_userContent">
                    <div className="menubar_flex">
                        <UserMenuBar/>
                    </div>
                    <div className="review_list_wd">
                    <ol>
                        <h1><span id="review_bar">리뷰목록</span></h1>
                    </ol>
                    <div className="user_review_window">
                    {userReview.length === 0 ?(
                        <div className="not_userReivew">
                            <p>사용자가 등록한 리뷰목록이 존재하지 않습니다.</p>
                        </div>
                    ): userReview.map((userReview) => {
                        return <ReviewContent key={`userreviewkey-${userReview.reviewId}`} userReview={userReview} setUserReview={setUserReview} reviewSelect={reviewSelect} setReviewSelect={setReviewSelect}/> 
                    })
                    }
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
export default ReviewList;