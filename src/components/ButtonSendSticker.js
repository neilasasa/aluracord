import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function ButtonSendSticker(props) {
  const [isOpen, setOpenState] = React.useState('');

  return (
    <Box
      styleSheet={{
        position: 'relative',
      }}
    >
      <Button
        styleSheet={{
          borderRadius: '50%',
          padding: '0 3px 0 0',
          minWidth: '50px',
          minHeight: '50px',
          fontSize: '20px',
          lineHeight: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.neutrals[800],          
        }}
        buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals[200], //COR DA FONTE
            mainColor: appConfig.theme.colors.neutrals[800],
            mainColorStrong: appConfig.theme.colors.neutrals['700'],
            }}
        label="😉"
        onClick={() => setOpenState(!isOpen)}
      />

      {isOpen && (
        <Box
          styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '5px',
            position: 'absolute',
            backgroundColor: appConfig.theme.colors.neutrals[700],
            width: {
              xs: '200px',
              sm: '290px',
            },
            height: '300px',
            right: '30px',
            bottom: '30px',
            padding: '16px',
            }}
          onClick={() => setOpenState(false)}
        >
          <Text
            styleSheet={{
              color: appConfig.theme.colors.neutrals["000"],
              fontWeight: 'bold',
            }}
          >
            Stickers
          </Text>
          <Box
            tag="ul"
            styleSheet={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              flex: 1,
              paddingTop: '16px',
              overflow: 'scroll',
            }}
          >
            {appConfig.stickers.map((sticker) => ( //map o array stickers do arquivo config.json 
              <Text
                onClick={() => {
                  // console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
                  if (Boolean(props.onStickerClick)) {
                    props.onStickerClick(sticker); 
                  }
                }}
                tag="li" key={sticker}
                styleSheet={{
                  width: '50%',
                  borderRadius: '5px',
                  padding: '10px',
                  focus: {
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  },
                  hover: {
                    backgroundColor: appConfig.theme.colors.neutrals[800],
                  }
                }}
              >
                <Image src={sticker} />
              </Text>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}