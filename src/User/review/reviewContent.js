import { reviewDelete, reviewUpdate } from "../../Api/ApiService";
import { Link } from "react-router-dom";
import "./reviewList.css"

function ReviewContent({userReview, setUserReview, reviewSelect, setReviewSelect}){

    const HandleUserReviewListRemove = (e) => {
        e.preventDefault();
        reviewDelete(userReview.reviewId)
    }

    const NowReviewList = () => {
        setReviewSelect(userReview)
    }

    return(
        <section>
            <div  className="user_reviewlist_window">
                <div className="user_reviewlist_title">
                    <p>{userReview.title}</p>
                </div>
                <div className="uer_reviewlist_line"></div>
                <div className="user_reviewlist_content">
                    <p>{userReview.content}</p>
                    <div className="user_nickname_cal">
                        <span>닉네임 : {userReview.userNickName}</span>
                        <span>등록일 : {userReview.reviewCreateTime}</span>
                    </div>
                </div>
            </div>
            <div className="user_reivewlist_form">
                <div className="user_reivewlist_a_form">
                    <span><Link id="user_reivewlist_a" to="/UserReviewList/Modify" onClick={NowReviewList}>수정</Link></span>
                </div>
                <form className="user_reivewlist_btn" onSubmit={HandleUserReviewListRemove}>
                    <button type="submit" name="delete">삭제</button>
                </form>
            </div>
        </section>
    );
}
export default ReviewContent