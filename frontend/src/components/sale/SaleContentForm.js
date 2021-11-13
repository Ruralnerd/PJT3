import { Box } from '@mui/system'

const SaleContentForm = ({ onPostImage, onPutChange }) => {
  return (
    <div>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
        }}
      >
        <input type="file" onChange={onPostImage} />
        <textarea
          name="content_text"
          cols="30"
          rows="10"
          onChange={onPutChange}
        ></textarea>
      </Box>
    </div>
  )
}

export default SaleContentForm
