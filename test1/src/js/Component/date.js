import React, {Component} from 'react';
import moment from 'moment';

export default class Dates extends Component {
	
	constructor(props) {
		const {dayLabel, monthLabel, yearLabel, defaultDate, ids } = props;
		super(props);
		
		this.state = {
			day: null,
			month: null,
			year: null,
			selectDay: moment().date(),
			selectMonth:  moment().format("MMMM"),
			selectYear:  moment().year(),
			checked: false,
		};
	}
	
	


	shouldComponentUpdate(_nextProps, nextState) {
		return this.state.selectDay !== nextState.selectDay || this.state.selectMonth !== nextState.selectMonth || this.state.selectYear !== nextState.selectYear;
	}

	UNSAFE_componentWillMount() {
		let day = [], month = [], year = [];

		const pad = (n) => {
			return (n < 10 ? '0' + n : n );
		};

		for (let i=1; i<=31; i++) {
			day.push(this.props.padDay ? pad(i) : i);
		}

		let monthIndex = 1;
		for (const monthName of moment.localeData().months()) {
			month.push({
				text: monthName,
				value: monthIndex
			});
			monthIndex++;
		}

		for (let i=this.props.maxYear; i>=this.props.minYear; i--) {
			year.push(i);
		}

		this.setState({
			day: day,
			month: month,
			year: year,
		});
	}

	changeDate(e, type) {
		if (type === 'selectDay') {
			this.setState({
				[type]: e, 
				checked: false
			});
		} else if (type === 'selectMonth') {
			this.setState({
				[type]: e.text, 
				checked: false
			});
		} else if (type === 'selectYear') {
			this.setState({
				[type]: e, 
				checked: false
			});
		}else if (type === 'current') {
			this.setState({
				selectDay: 17,
				selectMonth:  "September",
				selectYear:  2018, 
				checked: true
			});
		}
		this.checkDate(e, type);
	}

	checkDate(value, type) {
		let { selectDay, selectMonth, selectYear } = this.state;

		if (type === 'selectDay') {
			selectDay = value;
		} else if (type === 'selectMonth') {
			selectMonth = value;
		} else if (type === 'selectYear') {
			selectYear = value;
		}
	}
				
	
	render() {
		var div = [];
		const dayElement = this.state.day.map((day, id) => {
			return <option value={ day } key={ id }>{ day }</option>
		});
		const monthElement = this.state.month.map((month, id) => {
			
			return <option value={ month.value } key={ id }>{ month.text }</option>;
		});
		const yearElement = this.state.year.map((year, id) => {
			return <option value={ year } key={ id }>{ year }</option>;
		});
		const dayDivElement = this.state.day.map((day, id) => {
			return <div className="list-item" key={id} onClick={(e) => this.changeDate(day,'selectDay')}>{ day }</div>
		});
		const monthDivElement = this.state.month.map((month, id) => {
			return <div className="list-item" key={id} onClick={(e) => this.changeDate(month,'selectMonth')}>{ month.text }</div>
		});
		const yearDivElement = this.state.year.map((year, id) => {
			return <div className="list-item" key={id} onClick={(e) => this.changeDate(year,'selectYear')}>{ year }</div>
		});
		
		const checked = this.state.checked
		
		return (
			<div className="date-conteiner">
				<form method="post" action="">
					<span>Válaszd ki a dátumot!</span>
					<div className="input-group">
						<div className="input-group-prepend">
						<i className="fa-calendar"></i>
					  </div>
						<div className="dropdown">
							<button type="button" id={`${this.props.ids}_dayButton`} className="dropdown-toggle custom-select-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onChange={(e) => this.changeDate(e, 'selectDay')}>
								{this.state.selectDay}
							</button>
							<input type="hidden" name={`${this.props.ids}_dayInput`} value={this.state.selectDay} onChange={(e) => this.changeDate(e, 'selectDay')}/>
							<div className="dropdown-menu small-menu" id={`${this.props.ids}`} aria-labelledby={`${this.props.ids}_dayInput`} onChange={(e) => this.changeDate(e, 'selectDay')}>
								<i className="fa-chevron-up"></i>
								<div className="list-inner">
									{ dayDivElement }
								</div>
								<i className="fa-chevron-down"></i>
							</div>
						</div>
						<div className="dropdown">
							<button type="button" id={`${this.props.ids}_monthButton`} className="dropdown-toggle custom-select-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onChange={(e) => this.changeDate(e, 'selectMonth')}>
								{this.state.selectMonth}
							</button>
							<input type="hidden" name={`${this.props.ids}_monthInput`} value={this.state.selectMonth} onChange={(e) => this.changeDate(e, 'selectMonnth')}/>
							<div className="dropdown-menu menu" id={`${this.props.ids}_month_content`} onChange={(e) => this.changeDate(e, 'selectMonth')}>
								<i className="fa-chevron-up"></i>
								<div className="list-inner">
									{ monthDivElement }
								</div>
								<i className="fa-chevron-down"></i>
							</div>
						</div>
						<div className="dropdown">
							<button type="button" id={`${this.props.ids}_yearButton`} className="dropdown-toggle custom-select-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onChange={(e) => this.changeDate(e, 'selectYear')}>
								{this.state.selectYear}
							</button>
							<input type="hidden" name={`${this.props.ids}_yearInput`} value={this.state.selectYear} onChange={(e) => this.changeDate(e, 'selectYear')}/>
							<div className="dropdown-menu menu" id={`${this.props.ids}_year_content`} onChange={(e) => this.changeDate(e, 'selectYear')}>
								<i className="fa-chevron-up"></i>
								<div className="list-inner">
									{ yearDivElement }
								</div>
								<i className="fa-chevron-down"></i>
							</div>
						</div>

					</div>
					<div className="input-button">
						<button class="btn btn-primary btn-block" type="button" id={`${this.props.ids}_addon2`}>Megrendelés és részletek</button>
					</div>
					<div className="custom-control custom-radio">
						<input type="radio" className="custom-control-input" id={`${this.props.ids}_radio_id`} name={`${this.props.ids}_name`} checked={checked? "checked":""} onChange={(e) => this.changeDate(e, 'current')}/>
						<label htmlFor={`${this.props.ids}_radio_id`} className="custom-control-label">set default date</label>
					</div>
					<div className="d-none">
						<select className="select" value={this.state.selectDay} onChange={(e) => this.changeDate(e, 'selectDay')}>
							{ dayElement }
						</select>
						<select className="select" value={this.state.selectMonth} onChange={(e) => this.changeDate(e, 'selectMonth')}>
							<option value="">{this.props.monthLabel}</option>
							{ monthElement }
						</select>
						<select className="select" value={this.state.selectYear} onChange={(e) => this.changeDate(e, 'selectYear')}>
							<option value="">{this.props.yearLabel}</option>
							{ yearElement }
						</select>
					</div>
				</form>
			</div>		
		);
	}
}

