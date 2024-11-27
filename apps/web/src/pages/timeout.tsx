import { useEffect, useState } from 'react';
import {
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from 'date-fns';
import { Card, Container, Skeleton, Stack, Typography } from '@mui/material';
import Countdown from 'react-countdown';
import { useNavigate, useSearchParams } from 'react-router-dom';

const API_URL =
  'https://qr-code-backend-service-422041495987.asia-southeast1.run.app/wifi';

type RentSessionData = {
  id: number;
  tokenId: string;
  minuteCredits: string;
  date: string;
};

export function TimeoutPage() {
  //   const { minuteByToken = "" } = useSearchParams<{ minuteByToken: string }>();
  //   const { minuteByToken = "" } = useSearchParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const [time, setTime] = useState<number | null>(null);

  const stringData = localStorage.getItem('rentSessionData') || null;
  const parseData = JSON.parse(stringData || '{}');
  const data = {
    tokenId: parseData.tokenId,
    minuteCredits: parseData.minuteCredits,
    startDate: parseData.date,
  };

  const startDate = Number(data.startDate);
  const decrementMinutes = Number(data.minuteCredits);

  useEffect(() => {
    const minuteByToken = params.get('minuteByToken');
    const url = new URL(`/wifi/${minuteByToken}`, API_URL);
    console.log({ url });
    console.log('request: ', JSON.stringify({ tokenId: minuteByToken }));
    fetch(url, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((rentSessionData: RentSessionData) => {
        console.log({ rentSessionData });
        localStorage.setItem(
          'rentSessionData',
          JSON.stringify(rentSessionData),
        );
        setTime(Number(rentSessionData.date));
      });

    setTime(startDate);
  }, [params]);
  //   }, [minuteByToken]);

  function addTimePad(time: number) {
    return String(time).padStart(2, '0');
  }

  function timesUp() {
    alert('Time is up');
    localStorage.removeItem('rentSessionData');
    localStorage.removeItem('url');
    localStorage.removeItem('qrCode');
    navigate('/');
  }

  return time ? (
    <Container>
      <Card>
        <Stack padding={2} gap={2}>
          <Stack padding={2} gap={2} direction={'row'}>
            <Typography variant="h6">Started:</Typography>
            <Typography variant="h6">
              {formatDistanceToNow(new Date(2024, 7, 4), { addSuffix: true })}
              {/* {formatDistanceToNow(new Date(time), { addSuffix: true })} */}
            </Typography>
          </Stack>
          <Stack padding={2} gap={2} direction={'row'} alignItems={'center'}>
            <Typography variant="h6">Countdown:</Typography>
            <Countdown
              zeroPadTime={0}
              zeroPadDays={0}
              renderer={({ hours, minutes, seconds }) => (
                <Typography variant="h6">
                  {addTimePad(hours)} : {addTimePad(minutes)} :{' '}
                  {addTimePad(seconds)}
                </Typography>
              )}
              //   date={Date.now() - (time - Date.now())}
              date={startDate + decrementMinutes}
              onComplete={() => {
                timesUp();
              }}
            />
          </Stack>
        </Stack>
      </Card>
    </Container>
  ) : (
    <TimeoutPageSkeleton />
  );
}

export function TimeoutPageSkeleton() {
  return (
    <Container>
      <Card>
        <Stack padding={2} gap={1}>
          <Stack padding={2} gap={2} direction={'row'}>
            <Skeleton variant="text" width={'100%'} />
            <Skeleton variant="text" width={'100%'} />
          </Stack>
          <Stack padding={2} gap={2} direction={'row'} alignItems={'center'}>
            <Skeleton variant="text" width={'100%'} />
            <Skeleton variant="text" width={'100%'} />
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
