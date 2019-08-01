import React, { useState, useEffect } from 'react';
import { Grid, Menu, Dropdown, Button, Icon } from 'semantic-ui-react';

import ErrorMessage from './errormessage';
import LogoWithMenu from './logowithmenu';
import SettingsPanel from './settings';

const Logos = ({ selectedPWMs }) => {
    
    // Rendering all the logos is slow, begin by rendering first two (which allows showing something, even if the user can't scroll)
    // This might be solved with react async mode
    
    const [first, setFirst] = useState(true);
    
    useEffect(() => {
        if (first) {
            setTimeout(() => {
                setFirst(false);
            }, 40);
        }
    }, [first, setFirst]);
    
    return (
        <>
            {(first ? selectedPWMs.result.pwms.slice(0, 2) : selectedPWMs.result.pwms).map((pwm,i) => {
                const name = selectedPWMs.result.motifnames[i];
                return (
                    <LogoWithMenu
                      key={name}
                      name={name}
                      pwm={pwm} />
                );
            })}
        </>
    );
    
};

class UploadWorkspace extends React.Component {
    
    constructor(props) {
        super(props);
        this.fileinput = React.createRef();
	this.state = {
	    pwms: [],
            errors: [],
            processed: 0,
            total: 0,
            selectedfile: 0,
	};
    }
    
    async parseFile(f) {
        const reader = new FileReader();
        if (f.size > 100000000) {
            this.setState(({ errors, processed }) => ({
                errors: [
                    ...errors, {
                        file: f,
                        message: "file too large (size limit is 100MB)"
                    }
                ],
                processed: processed + 1
            }));
            return;
        }
        reader.onload = e => {
            let result, i = 0;
            while ((!result || !result.pwms) && this.props.parse[i++]) {
                result = (this.props.parse[i++])(e.target.result);
            }
            if (Object.keys(result.pwms).length !== 0) {
                this.setState(({ pwms, processed }) => ({
                    pwms: [
                        ...pwms, {
                            file: f,
                            result
                        }
                    ],
                    processed: processed + 1
                }));
            } else {
                this.setState(({ errors, processed }) => ({
                    errors: [
                        ...errors, {
                            file: f,
                            message: "no motifs found - is the file in the correct format?"
                        }
                    ],
                    processed: processed + 1
                }));
            }
        };
        reader.onerror = e => this.setState(({ errors, processed }) => ({
            errors: [
                ...errors, {
                    file: f,
                    message: "reading failed - is the file in the correct format?"
                }
            ],
            processed: processed + 1
        }));
        reader.readAsText(f);
    }

    selectFile(i) {
        this.setState({
            selectedfile: i,
        });
    }
    
    errorclosed() {
        this.setState({
            errors: [],
            total: this.state.total - this.state.errors.length,
            processed: this.state.processed - this.state.errors.length
        });
    }
                          
    openFileInput() {
        this.fileinput.current.click();
    }

    fileReceived(e) {
        this.setState({ total: this.state.total + e.target.files.length });
        Array.from(e.target.files).map(this.parseFile.bind(this));
    }
    
    render() {
        
        let isdone = this.state.processed === this.state.total && this.state.pwms.length > 0;
        let selectedPWMs = this.state.pwms[this.state.selectedfile];
        let selectedGlyphmap = (selectedPWMs && selectedPWMs.result && selectedPWMs.result.pwms
                                && selectedPWMs.result.pwms.length > 0 && selectedPWMs.result.pwms[this.state.selectedmotif]
                                && selectedPWMs.result.pwms[this.state.selectedmotif].glyphmap) || this.state.glyphmap;
	return (
            <>
	      <Grid className="centered" style={{ width: "90%", marginLeft: "5%", height: "100%" }}>
                <Grid.Row />
		<Grid.Row style={{ height: "100%" }}>
                    { this.state.errors.length > 0 && (
                        <ErrorMessage errors={this.state.errors} onClick={this.errorclosed.bind(this)}/>
                    )}
                    {this.state.pwms.length === 0
                     ? (
                         <Grid.Column width={16} style={{ height: '100%', textAlign: "center" }}>
                           <Button style={{ fontSize: "24pt", textAlign: "center" }} onClick={this.openFileInput.bind(this)} >
                             <Icon style={{fontSize: "72pt", marginLeft: '0em', marginRight: '0em', marginTop: '0.3em' }} name="upload" />
                             <br/>
                             upload files
                           </Button>
                         </Grid.Column>
                     )
                     : isdone && (
                         <Grid.Column width={16}>
                           <Menu secondary pointing>
                             <Dropdown item text={selectedPWMs.result.name || selectedPWMs.file.name}>
                               <Dropdown.Menu>
                                 {this.state.pwms.map( (pwmset, i) => (
                                     <Dropdown.Item key={"fileitem_" + i}
                                                    onClick={() => this.selectFile(i)}>
                                       {pwmset.result.name || pwmset.file.name}
                                     </Dropdown.Item>
                                 ))}
                               </Dropdown.Menu>
                             </Dropdown>
                             <Menu.Item className="floated right">
                               <span style={{ cursor: "pointer" }}>
                                 <Icon name="download"/>&nbsp;download all as ZIP
                               </span>
                               <span style={{ width: '2em' }} />
                               <span onClick={this.openFileInput} style={{ cursor: "pointer" }}>
                                 <Icon name="upload"/>&nbsp;upload more
                               </span>
                             </Menu.Item>
                           </Menu>
                           <Grid style={{ width: '100%' }}>
                             <Logos selectedPWMs={selectedPWMs} />
                           </Grid>
                         </Grid.Column>
                     )}
                    <input ref={this.fileinput}
                           type="file"
                           hidden
                           onChange={this.fileReceived.bind(this)}
                           multiple />
                </Grid.Row>
              </Grid>
            </>
        );
    }
    
};
export default UploadWorkspace;
