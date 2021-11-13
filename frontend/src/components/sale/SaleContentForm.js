import { Box } from '@mui/system'

const SaleContentForm = ({ onPostImage }) => {
  return (
    <div>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
        }}
      >
        <input type="file" onChange={onPostImage} />
      </Box>
    </div>
  )
}

export default SaleContentForm
