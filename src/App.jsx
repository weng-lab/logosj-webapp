import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { HomePage } from './components/homepage';
import { GalleryPage } from './components/gallery';
import { DNAGallery } from './components/gallery/dna';
import { ProteinGallery } from './components/gallery/protein';
import { ExtendedAlphabetGallery } from './components/gallery/extended';
import { NegativeAlphabetGallery } from './components/gallery/negatives';
import { DinucleotideGallery } from './components/gallery/dinucleotide';
import { AnnotatedGallery } from './components/gallery/annotated';
import { AnyUploadWorkspace } from './components/workspace/index';

class App extends Component {
    
    render() {
	return (
	    <Router basename={process.env.PUBLIC_URL}>
	      <Switch>
		<Route exact path='/' component={HomePage} />
                <Route path='/gallery' exact render={() => <GalleryPage />} />
                <Route path='/create/' render={() => <AnyUploadWorkspace />} />
                <Route path='/gallery/dna' exact render={() => <DNAGallery />} />
                <Route path='/gallery/protein' exact render={() => <ProteinGallery />} />
                <Route path='/gallery/extended' exact render={() => <ExtendedAlphabetGallery />} />
                <Route path='/gallery/negatives' exact render={() => <NegativeAlphabetGallery />} />
                <Route path='/gallery/dinucleotide' exact render={() => <DinucleotideGallery />} />
                <Route path='/gallery/annotated' exact render={() => <AnnotatedGallery />} />
	      </Switch>
	    </Router>
	);
    }
    
}

export default App;
