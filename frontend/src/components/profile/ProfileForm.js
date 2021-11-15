/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Button from '../common/Button'
import { Link } from 'react-router-dom'

const ProfileForm = ({ userData, onLogout }) => {
  return (
    <>
      {userData && (
        <div>
          <p>프로필임ㅋㅋ</p>
          <Button onClick={onLogout}>로그아웃</Button>
          <Link to="/profile/update">
            <Button>내 정보 수정</Button>
          </Link>
        </div>
      )}
    </>
    //     <div>
    //       {loadingProfile && '로딩 중...'}
    //       {!loadingProfile && userData && (
    //         <div>
    //           <div>판매자님의 프로필</div>
    //           <div>
    //             <div>{userData.profile_img}</div>
    //             <div>
    //               <div>이름:{userData.nickname}</div>
    //               <div>주소:{userData.address}</div>
    //               <div>연락처:{userData.phone}</div>
    //             </div>
    //           </div>
    //           <div>판매자님의 판매상품</div>
    //           <div>
    //             {userData.markets.map((market) => (
    //               <div key={market.id}>
    //                 <div>
    //                   <div>{market.thumbnail_img}</div>
    //                   <div>{market.title}</div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //           <div>판매자님의 이야기</div>
    //           <div>
    //             {userData.storys.map((story) => (
    //               <div key={story.id}>
    //                 <div>
    //                   <div>{story.thumbnail_img}</div>
    //                   <div>{story.title}</div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   )
    // }
    // // 판매자가 아닐 경우
    // else {
    //   return (
    //     <div>
    //       {loadingProfile && '로딩 중...'}
    //       {!loadingProfile && userData && (
    //         <div>
    //           <Button onClick={onLogout}>로그아웃</Button>
    //           <div>구매자님의 프로필</div>
    //           <Link to="/profile/update">
    //             <Button>내 정보 수정</Button>
    //           </Link>
    //           <div>
    //             <div>{userData.profile_img}</div>
    //             <div>
    //               <div>이름:{userData.nickname}</div>
    //               <div>주소:{userData.address}</div>
    //               <div>연락처:{userData.phone}</div>
    //             </div>
    //           </div>
    //           <button onClick={registerButton}>판매자 등록하기</button>
    //         </div>
    //       )}
    //     </div>
    //   )
    // }
  )
}
export default ProfileForm
