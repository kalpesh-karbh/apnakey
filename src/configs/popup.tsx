import toast from 'react-hot-toast'

function popMsg(message: string, type: string) {
  const options: any = {
    position: 'bottom-right',
    hideProgressBar: true,
    autoClose: 10000,
    theme: 'colored',
    style: {
      zIndex: 99999 // For toasts
    }
  }

  switch (type) {
    case 'Success':
      toast.success(message, options)
      break
    case 'Error':
      toast.error(message, options)
      break
    default:
      toast(message, options)
      break
  }
}

export default popMsg
