import { styled } from '@mui/material/styles';

export const ListWrap = styled('div')(() => ({
  position: 'relative',
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
