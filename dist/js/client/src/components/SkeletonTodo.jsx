import { Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

function SkeletonTodo() {
  const arr = new Array(15).fill(1)
  return (
    <>
      {arr.map((num, index) => (
        <Box key={index} display="flex" alignItems="center">
          <Skeleton animation="wave" variant="circle" width={20} height={20} />
          <Skeleton animation="wave" height={30} width="100%" />
        </Box>
      ))}
    </>
  )
}

export default SkeletonTodo