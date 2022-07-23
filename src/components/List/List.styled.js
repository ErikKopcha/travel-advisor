import { styled } from '@mui/material/styles';
import { Select } from '@mui/material';

export const ListWrap = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  overflow: 'auto',
  height: 'calc(100vh - 64px)',
  padding: '15px'
}));

export const FormControlWrap = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '20px',
  width: '100%',
}));