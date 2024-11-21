import { Container, Skeleton, Stack, Typography } from '@mui/material';

import { AmountCard } from '../components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Index() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleAmountCardClick(token: number) {
    setIsSubmitting(true);
    // TODO: refactor URL use search params constructor

    const requestUrl = `https://backend-image-422041495987.asia-southeast1.run.app/wifi?minuteByToken=${String(
      token,
    )}`;
    try {
      const response = await fetch(requestUrl);
      const { qrCode, url }: { qrCode: string; url: string } =
        await response.json();
      localStorage.setItem('qrCode', JSON.stringify(qrCode));
      localStorage.setItem('url', JSON.stringify(url));

      navigate('/generateqrcode');

      setIsSubmitting(false);
    } catch (error: any) {
      console.error(
        'There was a problem with the fetch operation:',
        error.message,
      );
    }
  }

  return (
    <Container
      maxWidth={'md'}
      sx={{
        padding: 2,
      }}
    >
      <Typography variant="h4" align={'center'}>
        Select a Token
      </Typography>
      {!isSubmitting ? (
        <Stack
          padding={2}
          gap={2}
          direction={{ sm: 'column', lg: 'row' }}
          justifyContent={'center'}
        >
          <AmountCard onCardClick={() => handleAmountCardClick(1)} amount={1} />
          <AmountCard onCardClick={() => handleAmountCardClick(5)} amount={5} />
          <AmountCard
            onCardClick={() => handleAmountCardClick(10)}
            amount={10}
          />
        </Stack>
      ) : (
        <Stack
          padding={2}
          gap={2}
          direction={{ sm: 'column', lg: 'row' }}
          justifyContent={'center'}
        >
          <Skeleton variant="rectangular" width={'100%'} height={50} />
          <Skeleton variant="rectangular" width={'100%'} height={50} />
          <Skeleton variant="rectangular" width={'100%'} height={50} />
        </Stack>
      )}
    </Container>
  );
}
