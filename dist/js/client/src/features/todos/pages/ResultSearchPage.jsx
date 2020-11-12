import { Box, Typography, withStyles } from '@material-ui/core'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import isEmpty from 'is-empty'
import PropTypes from 'prop-types'
import React from 'react'
import { useParams } from 'react-router-dom'
import ContainerPage from '../components/ContainerPage'
import TodosList from '../components/TodosList'

const styles = theme => ({

})

ResultSearchPage.propTypes = {
  searchTerm: PropTypes.string
}

function ResultSearchPage(props) {
  const { todoIds } = props
  const { searchTerm } = useParams()
  return (
    <ContainerPage>
      <Typography variant="h6" color="primary" style={{ marginBottom: 16 }} >
        {searchTerm && `Tìm kiếm: "${searchTerm}"`}
      </Typography>
      <Typography variant="body1">
        <b>Tác vụ</b>
      </Typography>
      <TodosList
        todosIds={todoIds}
      />
      {(isEmpty(todoIds) && searchTerm) && (
        <Box display="flex" alignItems="center">
          <Typography variant="body2">
            Không tìm thấy nội dung bạn đang tìm !
          </Typography>
          <SentimentVeryDissatisfiedIcon />
          <SentimentVeryDissatisfiedIcon />
        </Box>
      )}
    </ContainerPage>
  )
}

export default withStyles(styles)(ResultSearchPage)

