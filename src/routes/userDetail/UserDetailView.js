import React, { useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { requestSingleUserData } from "../../redux/actions/profile";
import ErrorAlert from '../../component/ErrorPage/ErrorAlert';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';

const useStyles = makeStyles(theme => ({
	userDetailWrapper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
		alignItems: 'center',
		boxShadow: '0 0 0 2px #f9f3f3',
		height: '50vh',
		'& img':{
			marginTop: '45px',
			borderRadius: '50%',
		},
		'& .user__name':{
			fontWeight: 'bold',
			marginTop: '10px',
			fontSize: '18px',
		},
		'& .user__detail':{
			fontSize: '14px'
		},
		'& .user__contactDetail':{
			position: 'relative',
			width: "80%",
			marginTop: "40px",
			'& .user__phone':{
				position: 'absolute',
    		left: 0,
			},
			'& .user__email':{
				position: 'absolute',
				right: 0,
				fontSize: '12px',
				'& svg':{
					marginBottom: '-7px',
				}
			},
			'& .user__phone':{
				fontSize: '12px',
				position: 'absolute',
				'& svg':{
					marginBottom: '-7px',
				}
			}
		}
  }
}));

const UserDetailView = (props) => {
	const { singleUserData, requestSingleUserData, match, singleUserRequest, singleUserData:{data} } = props;
	const classes = useStyles();

	useEffect(()=>{
		const userId = match.params && match.params.id
		requestSingleUserData(userId)
	}, [])

	if(singleUserRequest) {
		return <div>Loading...</div>
	}

	if(singleUserData && singleUserData.status && singleUserData.status !== 200) {
		return <ErrorAlert message={singleUserData.data && singleUserData.data.error} className="error-alert"/>
	}
	
	if(data){
		return(
			<Container component="main" maxWidth="xs">
				<div className={classes.userDetailWrapper}>
					<img src={ data.avatar } alt="profile-pic"/>
					<Typography component="h1" className="user__name">
						Mr. {data.first_name} {data.last_name}
					</Typography>
					<Typography component="p" className="user__detail">
						Co-founder & CEO at Bravo Incorporation
					</Typography>
					<Typography component="p" className="user__detail">
						(It Enabled Services)
					</Typography>
					<div className="user__contactDetail">
						<Typography component="p" className="user__phone">
							<PhoneIcon /> +17899048786
						</Typography>
						<Typography component="p" className="user__email">
							<MailOutlineIcon /> {data.email}
						</Typography>
					</div>
				</div>
			</Container>
		)
	}
	return <div></div>
}

const mapStateToProps = state => ({
	singleUserData: state.profile.singleUserData,
	singleUserRequest: state.profile.singleUserRequest
})

const mapDispatchToProps = dispatch => bindActionCreators({ requestSingleUserData }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetailView));