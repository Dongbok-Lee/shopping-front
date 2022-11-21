import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Hafter from '../Header/HeaderAfter';
import Hbefore from '../Header/HeaderBefore';
// import getProducts from '../Service/Fetcher';
import { productGet, cartCreate, cartGet, reviewCreate, reviewGet, cartUpdate} from '../Api/ApiService';
import './Detail.css'
import Review from '../review/review';

function Detail({convertPrice, cart, setCart, token, payList, setPayList }){
    const { id } = useParams();
    const [product, setProduct] = useState({}); //상품
    const [file, setFile] = useState("");   //파일 미리볼 url을 저장해줄 state
    const [count,setCount] = useState(1);   //  개수를 나타내는 Hooks
    // const [s,setS] = useState("a")

    const handelQuantity = (type) => {  //  -,+버튼을 눌렀을때 개수 변화는 함수
        if(type === "plus"){
          if(count === product.total)return;
            setCount(count+1);
        }else{
            if(count === 1) return;
            setCount(count-1)
        }
    };
    useEffect(() => {
      productGet().then((res) => {
        setProduct(res.data.data.find((product) => product.productId === parseInt(id)));
      });
      console.log("product Hooks에 해당 상품번호 저장하기")
    }, [id]);
    // useEffect(() => {
    //   cartGet().then((res) => {
    //     setCart(res.data.data)
    //   })
    // },[s])
    const saveFileimage = (e) =>{   //파일 저장함수
      e.preventDefault();
      setFile(URL.createObjectURL(e.target.files[0]));
    };

    const deleteFileimage = () =>{
        URL.revokeObjectURL(file);
        setFile("");
    };

    console.log(cart)

    const moveToPay = () => {
      cartCreate({productNum: count, productId: product.productId}).then((res) => {
        if(res.status === 200){
          setCart([...cart,res.data.data])
        }
      })
      window.location.href="../payment" //문제는 이렇게 하면 새로고침이 되기때문에 초기화가 된다...
    }

    const handleCart = () => {  //장바구니에 추가하는 함수
        const found = cart.find((el) => el.product.productId === product.productId)
        if(found){
          const idx = cart.indexOf(found)
          cartUpdate({cartId: found.cartId, productNum: found.productNum + count}).then((res)=>{
            if(res.status === 200){
              setCart([...cart.slice(0,idx), res.data.data, ...cart.slice(idx+1)])
            }
          })
        }else{
          cartCreate({productNum: count, productId: product.productId}).then((res) => {
                      if(res.status === 200){
                        setCart([...cart,res.data.data])
                      }
                    })
        }}

    const TokenHeaderView = (token) => {  //토큰 유무에 따른 헤더뷰어 함수
      return token ? <Hafter cart={cart}/> : <Hbefore/>
    }
    const HandleReivewUp = (e) => {
      e.preventDefault();
      const data = new FormData(e.target)
      const title = data.get("title")
      const content = data.get("content")
      const imgUrl = file
      reviewCreate({imgUrl: imgUrl, title: title, content: content, productId: product.productId})
    }
    const [state,setState] = useState("look"); //리뷰 창 상태 저장
    const [reviewlist,setReviewList] = useState([]) //리뷰 목록들

    useEffect(()=>{
      reviewGet(id).then((res) => {
        setReviewList(res.data.data)
      })
    },[state])
    return(
      product && (
      <main>
        <div className='Header'>
          {TokenHeaderView(token)}
        </div>
        <div className='Content'>
          <div className='main'>
            <div className='main_wrap_grid'>
              <section className='detail  '>
                <div className="detail_img">
                  {/* <img src={product.image} alt={product.id} /> */}
                  <img id="detail_img_wd" src={product.imgUrl} alt={product.productId} />
                </div>
              </section>
              <section className='detail'>
                <div className="detail_info0">
                  <p className="detail_product_name0">{product.name}</p>
                  <div className='line'></div>
                  <span className="detail_product_price0">
                    {convertPrice(product.price+"")}
                    <span className="detail_product_unit0">원</span>
                    <div className='line'></div>
                  </span>
                  {/* <div className='product_info'>{product.provider}</div> */}
                  <div className='product_info0'>{product.content}</div>
                  <div className='line'></div>
                </div>
                <div className='pay0'>
                  <span className='soo0'>수량 : </span>
                  <div className="amount">
                    <img
                      className="minus"
                      src="/images/icon-minus-line.svg"
                      alt="minus"
                      onClick={()=>handelQuantity("minus")}
                    />

                    <div className="count">
                      <span>{count}</span>
                    </div>

                    <img
                      className="plus"
                      src="/images/icon-plus-line.svg"
                      alt="plus"
                      onClick={()=>handelQuantity("plus")}
                    />
                  </div>
                </div>
                <div className='line'></div>
                <div className="sum">
                  <div className="total_info0">
                    <div className='sum_price_wd0'><span className="sum_price0">총 상품 금액</span></div>                
                    <div className='total_price0'>
                        <span className="total_count0">총 수량 : {count}개</span>
                        <span className="total_price1">
                          {convertPrice(product.price*count)}                  
                          <span className="total_unit1">원</span>
                        </span>
                    </div>
                  </div>
                </div>
                <div className="button_detail">
                  <button className="button_buy0" onClick={()=>moveToPay()}>바로 구매</button>
                  <button className="button_cart0" onClick={()=>handleCart()}>장바구니</button>
                </div>
              </section>
            </div>
            <div className="review-content0">
            <div className='review-title-box0'>
              <p className='review-title0'>review</p>
            </div>
            <div className='review-btn0'>
              <button className='btn-review-up0' onClick={()=>setState("up")}>등록</button>
              <button className='btn-review-look0' onClick={()=>setState("look")}>보기</button>
            </div>
            <div className='pop'>
              { state === "up" ?
              <form id="review-up-form" onSubmit={HandleReivewUp}> 
                <div className="sample_reveiw_img_wd">
                            <img className="sample_review_img"
                                // alt="sample"
                                src={file}
                            />
                <input type="file" name='imgUrl' onChange={saveFileimage} className='review_img_upload' multiple="multiple"/>
              </div>
              <div className='input_review'>
                <TextField name="title"
                  label="제목" 
                  fullWidth
                  // className="review-up-title"
                  variant="outlined"
                  multiline
                  maxRows={2}/>
                <div className='review-up-line'></div>
                <TextField name="content"
                  label="내용" 
                  fullWidth
                  // className="review-up-content"
                  variant="outlined"
                  multiline
                  maxRows={3}/>
                <div className='review-up-btn-box'>
                  <button type='submit' onClick={deleteFileimage} className='review-up-btn'>등록하기</button>
                </div>
                </div>
              </form>
              :
              <div id="review-look-form">
              { reviewlist.length === 0 ?(
              <p>해당 상품에 등록된 리뷰가 없습니다.</p>)
              : reviewlist.map((reviewlist) => {
                return <Review key={`reviewkey-${reviewlist.reviewId}`} reviewlist={reviewlist} setReviewList={setReviewList}/>
              })
              }
              </div>
              }
            </div>
          </div>
          </div>
        </div>
        <footer>
        </footer>
      </main>
    )
    );
}
export default Detail;