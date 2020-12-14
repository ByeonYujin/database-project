import React, {Component} from 'reatc';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import axios from 'axios'
import ReceivedMsg from './ReceivedMsg';
import SentMsg from './SentMsg';

axios.defaults.withCredentials = true;
const headers = {withCredentials: true};

export default class MyMessage extends Component{
    constructor(props){
        super(props);
        this.state={
            sent_msg: [],
            received_msg: [],
            update_form: "none",
            visible: "visible"
        };
    }
    componentDidMount(){
        this.ShowMessages();
    }
    ShowMessages=async ()=> {
        const userId = ""
        console.log(userId)
        const send_param={userId, headers};
        if (userId){
            try{
                const result=await axios.post("http://localhost:3000/test/mymessage", send_param);
                if (result.data.received_msg){
                    this.setState({received_msg: result.data.received_msg});
                }
                if (result.data.sent_msg){
                    this.setState({sent_msg: result.data.sent_msg});
                }
                console.log(result.data);
            }catch(err){
                console.log(err);
            }
        }else{
            alert("로그인이 필요합니다.");
        }
    }
    render() {
        return (
            <div>
                <div>
                    <div>받은 쪽지함</div>
                    <div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>쪽지번호</TableCell>
                                    <TableCell>발신인</TableCell>
                                    <TableCell>생성일</TableCell>
                                    <TableCell>수정일</TableCell>
                                    <TableCell>내용</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.received_msg.map((message)=>{
                                    return <ReceivedMsg key={message.id} id={message.id} senderName={message.senderName} createDate={message.createdAt} updateDate={message.updatedAt}
                                    endries={this.state.sent_msg} showMessages={this.state.ShowMessages}></ReceivedMsg>
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}