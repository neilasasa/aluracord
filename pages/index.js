import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React, { useState }  from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Titulo(props){
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag> {props.children} </Tag>   
            <style jsx>
                {`
                    ${Tag} 
                    {
                        color : ${appConfig.theme.colors.neutrals['050']};
                        font-size : 24px;
                        font-weight : 600;
                        margin-bottom: 1rem;
                        letter-spacing: 3.5px;
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
    const [username, setUsername] = useState('');
    const imgError = 'https://wallpapercave.com/wp/cvoz2gS.jpg';
    const roteamento = useRouter();

    const [userLocation, setUserLocation] = useState();
    const [user, setUser] = useState();
    
    // TRY TO INCLUDE THE FETCH FOR GITHUB API IN USE EFFECT        
    // React.useEffect(() => {
    //   fetch(`https://api.github.com/users/${username}`)
    //   .then(response => response.json())
    //   .then((data) => {
    //     setUserLocation(data.location);    
    //     //setUser(data);    
    //     console.log(data);
    //   });
      
    // }, []);

    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then((data) => {
        setUserLocation(data.location);    
        //setUser(data);    
        console.log(data);
      });
        
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
              opacity: .92,
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={(event) => {
                event.preventDefault();
                roteamento.push(`/chat?username=${username}`);
                // window.location.href = '/chat';
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px', marginLeft: '1rem'
              }}
            >
              <Titulo tag="h4">Let's talk about the environment !</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['050'] }}>
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
                placeholder='Insira seu usuario'
                value={username}
                onChange={function (event){
                  // Onde ta o valor ?
                  const valor = event.target.value;  
                  // Trocar o valor da variavel atraves do React e avisar quem precisar
                  setUsername(valor);
                }}
                // *** VERIFICAR SE CONSEGUIMOS APAGAR O CAMPO APOS RECARREGAR A PAGINA
                // onLoad={(event) => {
                //   console.log("Loaded")
                //   //setUsername('');
                // }}
                textFieldColors={{
                    textColor: appConfig.theme.colors.primary[200],
                    mainColor: appConfig.theme.colors.primary[400],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.primary[600],                  
                }}
                styleSheet={{
                  padding: '.7rem',
                  borderColor: appConfig.theme.colors.primary[700],
                  borderWidth: '1.5px'
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.primary[200],
                  mainColor: appConfig.theme.colors.primary[600],
                  mainColorLight: appConfig.theme.colors.primary[600],
                  mainColorStrong: appConfig.theme.colors.primary[300],
                }}
                styleSheet={{
                  padding: '.7rem',
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
                backgroundColor: appConfig.theme.colors.primary[600],
                border: '2px solid',
                borderColor: appConfig.theme.colors.primary[700],
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
                  color: appConfig.theme.colors.primary[200],
                  backgroundColor: appConfig.theme.colors.primary[700],
                  padding: '3px 10px',
                  borderRadius: '1000px',
                  textAlign: 'center',
                  marginTop: '.5rem'
                }}
              >
                {
                  username.length < 2 
                  ? "Check again your username"
                  : username
                }
                
              </Text>

              <Text 
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.primary[200],
                  backgroundColor: appConfig.theme.colors.primary[700],
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
    