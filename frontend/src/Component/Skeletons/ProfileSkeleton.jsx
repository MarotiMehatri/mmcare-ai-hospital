import React from 'react'
import Skeleton from 'react-loading-skeleton'

function ProfileSkeleton () {
  return (
    <div className='profile-skeleton'>
      <Skeleton circle width={100} height={100}/>

      <div style={{marginTop:"20px"}}>
        <Skeleton height={30} width={200} />
      </div>

      <div style={{marginTop: "10px"}}>
        <Skeleton count={4} height={20} />
      </div>
    </div>
  )
}

export default ProfileSkeleton