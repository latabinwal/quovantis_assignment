import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter, Link } from "react-router-dom";
import { requestUserList } from "../../redux/actions/profile";
import Pagination from '../../component/Pagination';
import ErrorAlert from '../../component/ErrorPage/ErrorAlert';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Container,
	Paper,
	Typography 
} from '@material-ui/core';

const useStyles = makeStyles({
	profileContainer:{
		marginTop: '40px',
		'& .list__title':{
			margin: '-30px 0 15px 0',
			fontSize: '26px'
		},
		'& .pagination__list':{
			display: 'flex',
			listStyle: 'none',
			margin: 0,
			padding: 0,
			marginTop: '20px',
			'& li':{
				padding: '2px 12px',
				border: '1px solid',
				cursor: 'pointer'
			}
		}
	},
  table: {
		minWidth: 450,
		'& td':{
			padding: '10px',
			cursor: 'pointer',
			'& a':{
				color: '#000',
    		textDecoration: 'none',
			},
			'& img':{
				height: '60px',
			}
		}
  },
});

const DashboardView = (props) => {
	const classes = useStyles();
	const [ page, setPage ] = useState(1)
	const { userListRequest, userList, userList:{data}, requestUserList } = props;

	useEffect(()=>{
		requestUserList(page)
	},[page])

	if(userListRequest) {
		return <div>Loading...</div>
	}

	if(userList && userList.status !== 200) {
		return <ErrorAlert message={userList.data && userList.data.error} className="error-alert"/>
	}

	// get the array of page numbers
	const pageNumbers = [];
	for (let i = 1; i <= data.total_pages; i++) {
		pageNumbers.push(i);
	}

  return (
		<Container className={classes.profileContainer}>
			<Typography component="h1" className="list__title">User List</Typography>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>First Name</TableCell>
							<TableCell>Last Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Profile Picture</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.data.map(row => (
							<TableRow key={row.id}>
								<TableCell>
									<Link to={`/users/${row.id}`}>{row.first_name}</Link>
								</TableCell>
								<TableCell>
									<Link to={`/users/${row.id}`}>{row.last_name}</Link>
								</TableCell>
								<TableCell>
									<Link to={`/users/${row.id}`}>{row.email}</Link>
								</TableCell>
								<TableCell>
									<Link to={`/users/${row.id}`}>
										<img src={row.avatar} alt={`profile-img ${row.id}`} />
									</Link>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination
				onClickList={(number)=>{setPage(number)}}
				onClickPrev={page>1 ? ()=>{setPage(page-1)} : ()=>{}}
				onClickNext={page< pageNumbers.length ? ()=>{setPage(page+1)} : ()=>{}}
				pageNumbers={pageNumbers}
			/>
		</Container>
  );
}
const mapStateToProps = state => ({
	userList: state.profile.userList,
	userListRequest: state.profile.userListRequest
})

const mapDispatchToProps = dispatch => bindActionCreators({ requestUserList }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardView));
