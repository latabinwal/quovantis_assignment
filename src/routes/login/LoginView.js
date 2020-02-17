import React, { useEffect } from 'react';
import { Container, Button } from '@material-ui/core';
import { reduxForm } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import InputWithLabel from '../../component/formFields/InputWithLabel';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { requestLoginUser } from "../../redux/actions/login";
import ErrorAlert from '../../component/ErrorPage/ErrorAlert';
import Auth from '../../Auth';

const useStyles = makeStyles(theme => ({
	paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
		alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
		boxShadow: '0 0 0 2px #f9f3f3',
		borderRadius: '4px',
		'& .form__field':{
			'& label':{
				display: 'block',
				margin: '15px 0 15px 15px',
			},
			'& input':{
				flex: 1,
				padding: '.4em 10em 0.4em 0.4em',
				fontSize: '1em',
				marginLeft: '15px',
				border: '1px solid #ccc',
				borderRadius: '3px',
				outline: "none",
				'@media (max-width: 767px)':{
					padding: '.4em 9em 0.4em 0.4em',
				}
			},
		},
		'& .form__passwordField':{
			position: 'relative',
			width: '100%',
			'& .form__forgotPassword':{
				position: 'absolute',
				right: '45px',
				top: '0px',
				fontSize: '11px',
				color: "#cacaca",
			}
		},
		'& .form__loginFooter':{
			marginTop: '40px',
			borderTop: '1px solid #ded7d7',
			height: '80px',
			background: "rgb(249, 251, 255)",
			'& button':{
				float: 'right',
				marginRight: '3em',
				border: '1px solid #4fa3f9',
				background: '#4fa3f9',
				borderRadius: '50px',
				padding: '.5em 2em',
				color: '#fff',
			}
		},
		'& .error-alert':{
			textAlign: 'center',
			marginTop: '-48px',
			paddingBottom: '23px',
			color: '#ea5959',
			textTransform: 'capitalize',
			fontSize: '18px',
		},
	},
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

let LoginView = (props) => {
	const { handleSubmit, loginData, history } = props;
	const classes = useStyles();

	useEffect(()=>{
		if(loginData && loginData.status === 200){
			Auth.authenticate()
			history.push('/dashboard')
		}
	}, [loginData])

	const submitLoginDetail = async values => {
		const { requestLoginUser } = props;
		requestLoginUser(values)
	}

	return(
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<form
					onSubmit={handleSubmit(submitLoginDetail)}
					className={classes.form}
				>
					<InputWithLabel
						name="email"
						type="text"
						placeholder="First Name"
						label="Email:"
						wrapperClass="form__field"
					/>
					<div className="form__passwordField">
						<InputWithLabel
							name="password"
							type="password"
							placeholder="First Name"
							label="Password:"
							wrapperClass="form__field"
						/>
						<div className="form__forgotPassword">Forgot your password?</div>
					</div>
					<div className="form__loginFooter">
						<Button type="submit" className={classes.submit}>Login</Button>
					</div>
					{loginData && loginData.status !== 200 &&
						<ErrorAlert message={loginData.data && loginData.data.error} className="error-alert"/>
					}
				</form>
			</div>
		</Container>
	)
}

LoginView = reduxForm({
  form: "LoginView"
})(LoginView);

const mapStateToProps = state => ({
	loginData: state.login.loginData,
})

const mapDispatchToProps = dispatch => bindActionCreators({ requestLoginUser }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginView));