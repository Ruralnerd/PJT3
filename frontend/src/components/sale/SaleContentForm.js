import { Box } from '@mui/system'

const SaleContentForm = ({ form, onPostImage, onPutChange }) => {
  const imgNameArray = form.contents[form.current_page - 2].img.split('/')
  const lenINA = imgNameArray.length
  return (
    <div>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
        }}
      >
        <label htmlFor="content_img">파일명: {imgNameArray[lenINA - 1]}</label>
        <input name="content_img" type="file" onChange={onPostImage} />
        <textarea
          name="content_text"
          cols="30"
          rows="5"
          onChange={onPutChange}
          value={form.contents[form.current_page - 2].content}
        />
      </Box>
    </div>
  )
}

export default SaleContentForm
