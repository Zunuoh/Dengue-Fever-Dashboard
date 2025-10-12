import { Component } from '@angular/core';
import { TipSection } from '../../models/monthly-predictions-model';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-prevention-tips',
  imports: [MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatListModule],
  templateUrl: './prevention-tips.component.html',
  styleUrl: './prevention-tips.component.css'
})
export class PreventionTipsComponent {
tipSections: TipSection[] = [
    {
      id: 'home',
      title: 'At Home — Remove Breeding Sites',
      summary: 'Prevent mosquitoes from breeding around your home.',
      icon: 'home',
      bullets: [
        'Empty, clean, or cover water containers weekly (buckets, flower vases, pet bowls).',
        'Clear gutters and drain places where water collects.',
        'Store tyres and unused containers under cover or dispose of them.',
        'Use window/door screens and sleep under nets if necessary.'
      ]
    },
    {
      id: 'outside',
      title: 'Outdoors & Personal Protection',
      summary: 'Protect yourself when outside during mosquito activity hours.',
      icon: 'park',
      bullets: [
        'Wear long-sleeves and pants during dawn and dusk.',
        'Apply EPA-approved repellents (DEET, picaridin, IR3535, or oil of lemon eucalyptus).',
        'Avoid areas with standing water when possible.'
      ]
    },
    {
      id: 'community',
      title: 'Community Actions',
      summary: 'How communities can reduce dengue risk.',
      icon: 'groups',
      bullets: [
        'Participate in local clean-up events to remove standing water.',
        'Report large pools of stagnant water to local authorities.',
        'Support public health campaigns and vector control measures.'
      ]
    },
    {
      id: 'care',
      title: 'Recognize & Seek Care Early',
      summary: 'Know the symptoms and seek medical help quickly.',
      icon: 'medical_information',
      bullets: [
        'Symptoms: sudden high fever, severe headache, pain behind the eyes, joint/muscle pain, rash.',
        'If you suspect dengue, visit a health facility promptly — early care can reduce complications.',
        'Avoid taking NSAIDs (aspirin, ibuprofen) unless advised by a clinician — use paracetamol for fever.'
      ]
    }
  ];

  // Quick summary stats for poster
  posterSummary = {
    title: 'DENGUE PREVENTION',
    subtitle: 'Small actions. Big impact.',
    bullets: [
      'Eliminate standing water weekly',
      'Use screens & nets',
      'Wear protective clothing',
      'Apply recommended insect repellent'
    ],
    footer: 'If you have fever, seek care early. Learn more at your local health service.'
  };
}
