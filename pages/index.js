import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React, { useState }  from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Titulo(props){
    // console.log(props);
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag> {props.children} </Tag>   
            <style jsx>
                {`
                    ${Tag} 
                    {
                        color : ${appConfig.theme.colors.neutrals['000']};
                        font-size : 24px;
                        font-weight : 600;
                        margin-bottom: 1rem;
                    }            
                `}
            </style>
        </>
    );
}

// // Component React
// function HomePage() {
//     // JSX
//     return ( 
//         <div>
//             <GlobalStyle /> 
//             <Titulo tag="h2"> Boas vindas de volta! </Titulo>
//             <h2> Discord - Alura Matrix </h2>                         
//         </div>
//     )
// }
// export default HomePage

export default function PaginaInicial() {
    // const username = 'neilasasa';
    const [username, setUsername] = useState('neilasasa');
    const imgError = 'https://virtualbackgrounds.site/wp-content/uploads/2020/07/this-is-fine.jpeg';
    const roteamento = useRouter();

    const [userLocation, setUserLocation] = useState('');

    function handleChange(event){
      setUsername(event.target.value);

      if(event.target.value.length > 2){
        fetch(`https://api.github.com/users/${username}`)
          .then(response => response.json())
          .then(data => {
            setUserLocation(data.location);        
          });
      }
    }
      

    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/12/amazon-rainforest-1536x864.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', /*backgroundBlendMode: 'multiply',*/
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.primary[400],
              opacity: .9,
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function(event){
                event.preventDefault();
                roteamento.push('/chat');
                // window.location.href = '/chat';
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px', marginLeft: '1rem'
              }}
            >
              <Titulo tag="h4">Let's talk about the environment !</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['000'] }}>
                {appConfig.name}
              </Text>
  
              {/* <input 
                type="text"
                value={username}
                onChange={function (event){
                  // Onde ta o valor ?
                  const valor = event.target.value;  
                  // Trocar o valor da variavel atraves do React e avisar quem precisar
                  setUsername(valor);
                }}
              
              /> */}
              
              <TextField
                fullWidth
                value={username}
                onChange={handleChange}
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[999],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals[300],
                  },
                  primary: {
                    backgroundColor: appConfig.theme.colors.primary[400]
                  }
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorLight: appConfig.theme.colors.neutrals[200],
                  mainColorStrong: appConfig.theme.colors.neutrals[300],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[300],
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}
                
                src={
                  username.length > 2
                    ? `https://github.com/${username}.png`
                    : imgError
                }
                            
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px',
                  textAlign: 'center',
                  marginTop: '.5rem'
                }}
              >
                {
                  username.length > 2
                  ? username
                  : "Check again your username"
                }

              </Text>

              <Text 
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px',
                  textAlign: 'center',
                  marginTop: '.5rem'
                }}
              >

                {                  
                  username.length > 2
                  ? userLocation
                  : "----"
                }
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }
    