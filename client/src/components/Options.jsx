import { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { AiOutlineMore, AiOutlineDoubleRight } from 'react-icons/ai';
import { toast } from 'react-toastify';

const Options = ({ options, isCurrentWorkout, iconSize }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (action) => {
    /* if (isCurrentWorkout) { */
    action();
    handleClose();
    /* } else {
      toast.error('Changes cannot be made to this workout');
      handleClose();
    } */
  };
  return (
    <div className='options-container'>
      <Button
        aria-controls={anchorEl ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleClick}
        className='options'
      >
        <AiOutlineMore size={iconSize} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {options.map((option, index) => (
          <>
            <MenuItem onClick={() => handleItemClick(option.action)}>
              <ListItemIcon>{option.icon}</ListItemIcon>
              <ListItemText>{option.text}</ListItemText>
            </MenuItem>
            {index != options.length - 1 && <Divider />}
          </>
        ))}
      </Menu>
    </div>
  );
};
export default Options;
