import {styled} from '@mui/system'
import {switchUnstyledClasses} from '@mui/base/SwitchUnstyled'

const DeactivateUser = styled('span')(
  () => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 19px;
  height: 10px;
  cursor: pointer;
  margin-bottom: 4px;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: none;
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    border: 2px solid  #4F4F4F;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 4px;
    height: 4px;
    top: 3px;
    left: 4px;
    border-radius: 16px;
    border: 2px solid #4F4F4F;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: none;
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 10px;
      top: 3px;
      background-color: none;
      border: 2px solid  #FF6982

    }

    .${switchUnstyledClasses.track} {
      border: 2px solid  #FF6982
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `,
)

export default DeactivateUser
