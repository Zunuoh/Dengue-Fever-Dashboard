import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { DengueStore } from '../../store/dengue.store';

@Component({
  selector: 'app-heat-map',
  imports: [GoogleMapsModule],
  templateUrl: './heat-map.component.html',
  styleUrl: './heat-map.component.css'
})
export class HeatMapComponent {
  apiService = inject(ApiService)
  dengueStore = inject(DengueStore);

  map!: google.maps.Map;
  heatmap!: google.maps.visualization.HeatmapLayer;

  ngOnInit(): void {
    this.dengueStore.getHeatMapData();

  }

   ngAfterViewInit(): void {
    // Initialize map
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 10, lng: 10 },
      zoom: 2,
      mapTypeId: 'roadmap'
    };
    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    // Load heatmap data
    this.loadHeatmap();
  }

  loadHeatmap() {
    this.apiService.getHeatMapData().subscribe((res) => {
      console.log('heatmap data', res);
      const points = res.data.heatmap_points.map((p: any) => ({
        location: new google.maps.LatLng(p.lat, p.lng),
        weight: p.intensity
      }));

      this.heatmap = new google.maps.visualization.HeatmapLayer({
        data: points,
        map: this.map
      });

      this.heatmap.set('radius', 30);
      this.heatmap.set('opacity', 0.7);
    });
  }
}
