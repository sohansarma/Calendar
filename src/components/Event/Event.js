import { render } from 'react-dom';
import './Event.css';
import * as React from 'react';

// import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from './sample-base';
// import { PropertyPane } from './property-pane';
import { Month, TimelineViews, TimelineMonth, ScheduleComponent, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import * as dataSource from './datasource.json';
/**
 * schedule add and remove resources dynamically
 */
export class AddRemoveResources extends SampleBase {
    constructor() {
        super(...arguments);
        this.calendarCollections = [
            { CalendarText: 'My Calendar', CalendarId: 1, CalendarColor: '#c43081' },
            // { CalendarText: 'Company', CalendarId: 2, CalendarColor: '#ff7f50' },
            // { CalendarText: 'Birthday', CalendarId: 3, CalendarColor: '#AF27CD' },
            // { CalendarText: 'Holiday', CalendarId: 4, CalendarColor: '#808000' }
        ];
    }
    // generateCalendarData() {
    //     return [...dataSource.personalData, ...dataSource.companyData,
    //         ...dataSource.birthdayData, ...dataSource.holidayData];
    // }
    onChange(args) {
        let value = parseInt(args.event.target.getAttribute('value'), 10);
        let resourceData = this.calendarCollections.filter((calendar) => calendar.CalendarId === value);
        if (args.checked) {
            this.scheduleObj.addResource(resourceData[0], 'Calendars', value - 1);
        }
        else {
            this.scheduleObj.removeResource(value, 'Calendars');
        }
    }
    render() {
        return (<div className='schedule-control-section'>
                <div className='col-lg-12 control-section'>
                    <div className='control-wrapper'>
                            <ScheduleComponent cssClass='dynamic-resource' ref={schedule => this.scheduleObj = schedule} width='100%' height='650px' selectedDate={new Date(2018, 3, 1)} group={{ resources: ['Calendars'] }}>
                            <ResourcesDirective>
                                <ResourceDirective field='CalendarId' title='Calendars' name='Calendars' allowMultiple={true} dataSource={[this.calendarCollections[0]]} textField='CalendarText' idField='CalendarId' colorField='CalendarColor'>
                                </ResourceDirective>
                            </ResourcesDirective>
                            <ViewsDirective>
                                <ViewDirective option='Month'/>
                                <ViewDirective option='TimelineWeek'/>
                                <ViewDirective option='TimelineMonth'/>
                            </ViewsDirective>
                            <Inject services={[Month, TimelineViews, TimelineMonth, Resize, DragAndDrop]}/>
                        </ScheduleComponent>
                    </div>
                </div>
               {/* <div className='col-lg-3 property-section'>
                    <PropertyPane title='Show / Hide Resource'>
                        <table id='property' title='Show / Hide Resource' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <CheckBoxComponent value='1' id='personal' cssClass='personal' checked={true} label='My Calendar' disabled={true} change={this.onChange.bind(this)}></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <CheckBoxComponent value='2' id='company' cssClass='company' checked={false} label='Company' change={this.onChange.bind(this)}></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <CheckBoxComponent value='3' id='birthdays' cssClass='birthday' checked={false} label='Birthday' change={this.onChange.bind(this)}></CheckBoxComponent>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td style={{ width: '100%' }}>
                                        <CheckBoxComponent value='4' id='holidays' cssClass='holiday' checked={false} label='Holiday' change={this.onChange.bind(this)}></CheckBoxComponent>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>*/}

            </div>);
    }
}

// render(<AddRemoveResources />, document.getElementById('sample'));

export default AddRemoveResources;